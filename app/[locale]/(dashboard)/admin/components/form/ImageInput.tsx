import { CloudUpload, Delete } from "@mui/icons-material";
import {
  Box,
  IconButton,
  Stack,
  Typography,
  CircularProgress,
  LinearProgress,
} from "@mui/material";
import * as React from "react";
import Dropzone, { type FileRejection } from "react-dropzone";
import {
  useController,
  type Control,
  type RegisterOptions,
} from "react-hook-form";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { restrictToParentElement } from "@dnd-kit/modifiers";

interface UploadedImage {
  id: string;
  file: File | string;
  previewUrl: string;
  isUploading?: boolean;
}

interface ImageInputProps {
  name: string;
  control: Control<any>;
  rules?: RegisterOptions;
  accept?: Record<string, string[]>;
  maxSize?: number;
  disabled?: boolean;
  loading?: boolean;
  multiple?: boolean;
  maxFiles?: number;
  onUpload?: (file: File) => Promise<string | null>;
  enableDrag?: boolean;
}

// Sortable Image Item Component
const SortableImageItem = ({
  img,
  disabled,
  loading,
  onDelete,
  enableDrag,
}: {
  img: UploadedImage;
  disabled: boolean;
  loading: boolean;
  onDelete: (id: string) => void;
  enableDrag: boolean;
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: img.id,
    disabled: !enableDrag || disabled || loading || img.isUploading,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1000 : 1,
    opacity: isDragging ? 0.7 : 1,
  };

  return (
    <Box
      ref={setNodeRef}
      style={style}
      {...(enableDrag && !disabled && !loading && !img.isUploading
        ? attributes
        : {})}
      position="relative"
      sx={{
        width: { xs: "100%", sm: 180 },
        height: 180,
        borderRadius: 1,
        overflow: "hidden",
        border: "1px solid #ccc",
        cursor:
          enableDrag && !disabled && !loading && !img.isUploading
            ? "grab"
            : "default",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        "&:active": {
          cursor:
            enableDrag && !disabled && !loading && !img.isUploading
              ? "grabbing"
              : "default",
        },
        "&:hover .delete-button": {
          opacity: !img.isUploading ? 1 : 0,
        },
      }}
    >
      {img.previewUrl && (
        <img
          src={img.previewUrl}
          alt="Selected image"
          style={{ objectFit: "contain" }}
          width={"100%"}
          height={"100%"}
          {...(enableDrag && !disabled && !loading && !img.isUploading
            ? listeners
            : {})}
        />
      )}

      {img.isUploading && (
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bgcolor="rgba(0,0,0,0.7)"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          sx={{
            backdropFilter: "blur(2px)",
          }}
        >
          <CircularProgress
            size={40}
            sx={{
              color: "white",
              mb: 1,
            }}
          />
          <Typography
            variant="caption"
            color="white"
            sx={{ fontWeight: 500, textAlign: "center" }}
          >
            Uploading...
          </Typography>
        </Box>
      )}

      {!disabled && !loading && !img.isUploading && (
        <IconButton
          className="delete-button"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(img.id);
          }}
          sx={{
            position: "absolute",
            top: 4,
            right: 4,
            opacity: 0,
            color: "white",
            bgcolor: "error.main",
            "&:hover": {
              bgcolor: "error.dark",
              transform: "scale(1.1)",
            },
            transition: "all 0.2s ease-in-out",
            zIndex: 10,
          }}
          size="small"
        >
          <Delete fontSize="small" />
        </IconButton>
      )}
    </Box>
  );
};

export function ImageInput({
  name,
  control,
  rules,
  accept = { "image/*": [] },
  maxSize = 1024 * 1024 * 5,
  disabled = false,
  loading = false,
  multiple = false,
  maxFiles = 5,
  onUpload,
  enableDrag = true,
}: ImageInputProps) {
  const { t } = useTranslation();

  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
  });

  const [internalImages, setInternalImages] = React.useState<UploadedImage[]>(
    []
  );
  const [isProcessing, setIsProcessing] = React.useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const generateId = () =>
    `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  const handleDrop = React.useCallback(
    async (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      rejectedFiles.forEach(({ file, errors }) => {
        errors.forEach((err) => {
          toast.error(`${t("error")}: ${file.name} - ${err.message}`);
        });
      });

      if (acceptedFiles.length === 0) return;

      setIsProcessing(true);

      const filesToProcess = multiple
        ? acceptedFiles.slice(0, maxFiles - internalImages.length)
        : acceptedFiles.slice(0, 1);

      const newImages = filesToProcess.map((file) => {
        const id = generateId();
        const previewUrl = URL.createObjectURL(file);

        return {
          id,
          file,
          previewUrl,
          isUploading: true,
        };
      });

      setInternalImages((prev) => {
        return multiple ? [...prev, ...newImages] : newImages;
      });

      setIsProcessing(false);

      if (onUpload) {
        const uploadPromises = newImages.map(async (img) => {
          try {
            const uploadedUrl = await onUpload(img.file as File);

            if (!uploadedUrl) {
              throw new Error("Upload returned no URL");
            }

            setInternalImages((prev) =>
              prev.map((prevImg) =>
                prevImg.id === img.id
                  ? {
                      ...prevImg,
                      file: uploadedUrl,
                      isUploading: false,
                    }
                  : prevImg
              )
            );

            return { id: img.id, url: uploadedUrl, success: true };
          } catch (error: any) {
            toast.error(
              `Upload failed for ${(img.file as File).name}: ${error.message}`
            );

            setInternalImages((prev) =>
              prev.filter((prevImg) => prevImg.id !== img.id)
            );

            return { id: img.id, url: null, success: false };
          }
        });

        await Promise.all(uploadPromises);

        // Update form value only after successful uploads
        setInternalImages((currentImages) => {
          const successfulImages = currentImages.filter(
            (img) => typeof img.file === "string" && !img.isUploading
          );

          onChange(
            multiple
              ? successfulImages.map((img) => img.file)
              : successfulImages[0]?.file || null
          );

          return currentImages;
        });
      } else {
        // Without upload handler, store File objects directly
        onChange(
          multiple
            ? newImages.map((img) => img.file)
            : newImages[0]?.file || null
        );
      }

      const message =
        filesToProcess.length === 1
          ? t("image_selected", { name: filesToProcess[0].name })
          : t("images_selected", { count: filesToProcess.length });

      toast.success(message);
    },
    [multiple, maxFiles, internalImages.length, onChange, t, onUpload]
  );

  const handleDelete = React.useCallback(
    (idToDelete: string) => {
      setInternalImages((prev) => {
        const updatedImages = prev.filter((img) => img.id !== idToDelete);
        onChange(
          multiple
            ? updatedImages.map((img) => img.file)
            : updatedImages[0]?.file || null
        );
        return updatedImages;
      });
    },
    [multiple, onChange]
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setInternalImages((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        const newItems = arrayMove(items, oldIndex, newIndex);

        onChange(
          multiple ? newItems.map((img) => img.file) : newItems[0]?.file || null
        );

        return newItems;
      });
    }
  };

  React.useEffect(() => {
    if (multiple) {
      if (Array.isArray(value)) {
        const needsUpdate =
          internalImages.length !== value.length ||
          internalImages.some((img, index) => img.file !== value[index]);

        if (needsUpdate) {
          const newInternalImages: UploadedImage[] = value.map((item) => {
            const existing = internalImages.find((img) => img.file === item);
            if (existing) return existing;
            return {
              id: generateId(),
              file: item,
              previewUrl:
                typeof item === "string" ? item : URL.createObjectURL(item),
            };
          });
          setInternalImages(newInternalImages);
        }
      } else if (
        (value === null || value === undefined) &&
        internalImages.length > 0
      ) {
        setInternalImages([]);
      }
    } else {
      if (value instanceof File || typeof value === "string") {
        const needsUpdate =
          internalImages.length !== 1 || internalImages[0]?.file !== value;

        if (needsUpdate) {
          const existing = internalImages.find((img) => img.file === value);
          if (existing) {
            setInternalImages([existing]);
          } else {
            setInternalImages([
              {
                id: generateId(),
                file: value,
                previewUrl:
                  typeof value === "string"
                    ? value
                    : URL.createObjectURL(value),
              },
            ]);
          }
        }
      } else if (
        (value === null || value === undefined) &&
        internalImages.length > 0
      ) {
        setInternalImages([]);
      }
    }
  }, [value, multiple]);

  React.useEffect(() => {
    return () => {
      internalImages.forEach((img) => {
        if (img.file instanceof File && img.previewUrl) {
          URL.revokeObjectURL(img.previewUrl);
        }
      });
    };
  }, [internalImages]);

  const renderDropzone = () => (
    <Dropzone
      onDrop={handleDrop}
      accept={accept}
      maxSize={maxSize}
      maxFiles={multiple ? maxFiles - internalImages.length : 1}
      multiple={multiple}
      disabled={
        disabled ||
        loading ||
        isProcessing ||
        (multiple && internalImages.length >= maxFiles)
      }
    >
      {(props) => {
        const { getRootProps, getInputProps, isDragActive } = props;
        return (
          <Box
            {...getRootProps()}
            sx={{
              border: "2px dashed",
              borderColor: isDragActive
                ? "primary.main"
                : error
                ? "error.main"
                : "grey.400",
              borderRadius: 1,
              p: 2,
              textAlign: "center",
              bgcolor: isDragActive ? "grey.100" : "background.paper",
              cursor: "pointer",
              opacity:
                disabled ||
                loading ||
                isProcessing ||
                (multiple && internalImages.length >= maxFiles)
                  ? 0.6
                  : 1,
              width: { xs: "100%", sm: 180 },
              height: 180,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              flexShrink: 0,
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                borderColor: error ? "error.main" : "primary.main",
                bgcolor: "action.hover",
                transform: "translateY(-1px)",
                boxShadow: 1,
              },
            }}
          >
            <input {...getInputProps()} />

            {isProcessing ? (
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                gap={1}
              >
                <CircularProgress size={40} sx={{ color: "primary.main" }} />
                <Typography
                  variant="caption"
                  color="primary.main"
                  sx={{ fontWeight: 500 }}
                >
                  {t("processing")}
                </Typography>
              </Box>
            ) : (
              <>
                <CloudUpload
                  sx={{
                    fontSize: 40,
                    color: isDragActive ? "primary.main" : "grey.500",
                    transition: "all 0.3s ease-in-out",
                  }}
                />
                <Typography
                  mt={1}
                  fontSize={14}
                  color={isDragActive ? "primary.main" : "text.primary"}
                  sx={{ transition: "color 0.3s ease-in-out" }}
                >
                  {t("drag_or_click_to_upload")}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  fontSize={12}
                  textAlign="center"
                >
                  {t("max_file_size")}: {formatBytes(maxSize)}
                  {multiple && ` (${t("max_files")}: ${maxFiles})`}
                </Typography>
              </>
            )}
          </Box>
        );
      }}
    </Dropzone>
  );

  return (
    <Stack
      width={"100%"}
      alignItems={"center"}
      justifyContent={"center"}
      spacing={2}
    >
      {multiple ? (
        enableDrag ? (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            modifiers={[restrictToParentElement]}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={internalImages.map((img) => img.id)}
              strategy={rectSortingStrategy}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 2,
                  overflowX: "auto",
                  px: 1,
                  py: 1,
                  mx: "auto",
                }}
              >
                {internalImages.map((img) => (
                  <SortableImageItem
                    key={img.id}
                    img={img}
                    disabled={disabled}
                    loading={loading}
                    onDelete={handleDelete}
                    enableDrag={enableDrag}
                  />
                ))}
                {internalImages.length < maxFiles && renderDropzone()}
              </Box>
            </SortableContext>
          </DndContext>
        ) : (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
              gap: 2,
              justifyContent: "center",
              width: "100%",
              mx: "auto",
            }}
          >
            {internalImages.map((img) => (
              <SortableImageItem
                key={img.id}
                img={img}
                disabled={disabled}
                loading={loading}
                onDelete={handleDelete}
                enableDrag={false}
              />
            ))}
            {internalImages.length < maxFiles && renderDropzone()}
          </Box>
        )
      ) : internalImages.length === 0 ? (
        renderDropzone()
      ) : (
        <SortableImageItem
          img={internalImages[0]}
          disabled={disabled}
          loading={loading}
          onDelete={handleDelete}
          enableDrag={false}
        />
      )}

      {error && (
        <Typography color="error" fontSize={12} mt={1}>
          {error.message}
        </Typography>
      )}
    </Stack>
  );
}

function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024,
    dm = decimals < 0 ? 0 : decimals,
    sizes = ["Bytes", "KB", "MB", "GB"],
    i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}
