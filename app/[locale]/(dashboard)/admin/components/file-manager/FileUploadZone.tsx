// FileManager/FileUploadZone.tsx
import { Box, Stack, Typography, CircularProgress } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import { type Control, useController } from "react-hook-form";
import Dropzone from "react-dropzone";
import { useRef, useEffect } from "react";

type FileWithProgress = {
  file: File;
  id: string;
  progress: number;
  preview?: string;
  isComplete: boolean;
  isSelected?: boolean;
  isUploading: boolean;
  uploadError?: string;
};

interface FileUploadZoneProps {
  control: Control<any>;
  onFilesChange: (files: FileWithProgress[]) => void;
  onUpload: (files: File[]) => Promise<void>;
  uploadLoading: boolean;
}

export const FileUploadZone = ({
  control,
  onFilesChange,
  onUpload,
  uploadLoading,
}: FileUploadZoneProps) => {
  const {
    field: { onChange },
    fieldState: { error },
  } = useController({ name: "files", control });

  const progressIntervalsRef = useRef<Map<string, NodeJS.Timeout>>(new Map());
  const previewUrlsRef = useRef<Map<string, string>>(new Map());

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const clearProgressInterval = (fileId: string) => {
    const interval = progressIntervalsRef.current.get(fileId);
    if (interval) {
      clearInterval(interval);
      progressIntervalsRef.current.delete(fileId);
    }
  };

  const createPreviewUrl = (file: File, fileId: string): string | undefined => {
    if (file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      previewUrlsRef.current.set(fileId, url);
      return url;
    }
    return undefined;
  };

  const cleanupPreviewUrl = (fileId: string) => {
    const url = previewUrlsRef.current.get(fileId);
    if (url) {
      URL.revokeObjectURL(url);
      previewUrlsRef.current.delete(fileId);
    }
  };

  // Cleanup URLs on unmount
  useEffect(() => {
    return () => {
      previewUrlsRef.current.forEach((url) => {
        URL.revokeObjectURL(url);
      });
      previewUrlsRef.current.clear();
    };
  }, []);

  const startProgressSimulation = (fileIds: string[]) => {
    fileIds.forEach((fileId) => {
      const progressInterval = setInterval(() => {
        onFilesChange((prevFiles: FileWithProgress[]) => {
          return prevFiles.map((f) => {
            if (f.id === fileId && f.isUploading && f.progress < 95) {
              const newProgress = Math.min(f.progress + Math.random() * 10, 95);
              return { ...f, progress: newProgress };
            }
            return f;
          });
        });
      }, 300);

      progressIntervalsRef.current.set(fileId, progressInterval);
    });
  };

  const handleDrop = async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    const newFileItems: FileWithProgress[] = acceptedFiles.map((file) => {
      const fileId = generateId();
      const fileItem: FileWithProgress = {
        file,
        id: fileId,
        progress: 0,
        isComplete: false,
        isUploading: true,
        preview: createPreviewUrl(file, fileId),
      };

      return fileItem;
    });

    // Add new files to state
    onFilesChange((prevFiles: FileWithProgress[]) => [
      ...prevFiles,
      ...newFileItems,
    ]);

    onChange(acceptedFiles);

    // Start progress simulation for all files
    const fileIds = newFileItems.map((f) => f.id);
    startProgressSimulation(fileIds);

    try {
      // Upload all files together (as your mutation expects)
      await onUpload(acceptedFiles);

      // Clear intervals and mark as complete
      fileIds.forEach(clearProgressInterval);

      onFilesChange((prevFiles: FileWithProgress[]) => {
        return prevFiles.map((f) => {
          if (fileIds.includes(f.id)) {
            return {
              ...f,
              progress: 100,
              isComplete: true,
              isUploading: false,
            };
          }
          return f;
        });
      });

      // Clear completed files after a short delay and cleanup URLs
      setTimeout(() => {
        onFilesChange((prevFiles: FileWithProgress[]) => {
          const filesToRemove = prevFiles.filter((f) => fileIds.includes(f.id));
          filesToRemove.forEach((f) => cleanupPreviewUrl(f.id));
          return prevFiles.filter((f) => !fileIds.includes(f.id));
        });
      }, 1500);
    } catch (error) {
      // Clear intervals and mark as failed
      fileIds.forEach(clearProgressInterval);

      onFilesChange((prevFiles: FileWithProgress[]) => {
        return prevFiles.map((f) => {
          if (fileIds.includes(f.id)) {
            return {
              ...f,
              isUploading: false,
              uploadError:
                error instanceof Error ? error.message : "Upload failed",
              progress: 0,
              isComplete: false,
            };
          }
          return f;
        });
      });
    }
  };

  // Handle file removal
  const handleRemoveFile = (fileId: string) => {
    cleanupPreviewUrl(fileId);
    clearProgressInterval(fileId);
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Dropzone onDrop={handleDrop} multiple={true} disabled={uploadLoading}>
        {({ getRootProps, getInputProps, isDragActive }) => (
          <Box
            {...getRootProps()}
            sx={{
              border: "2px dashed",
              borderColor: error
                ? "error.main"
                : isDragActive
                ? "primary.main"
                : "grey.400",
              borderRadius: 2,
              p: 3,
              textAlign: "center",
              cursor: uploadLoading ? "not-allowed" : "pointer",
              bgcolor: isDragActive ? "action.hover" : "background.paper",
              transition: "all 0.2s ease-in-out",
              opacity: uploadLoading ? 0.6 : 1,
              "&:hover": {
                borderColor: uploadLoading ? "grey.400" : "primary.main",
                bgcolor: uploadLoading ? "background.paper" : "action.hover",
              },
            }}
          >
            <input {...getInputProps()} disabled={uploadLoading} />
            <Stack
              spacing={2}
              alignItems="center"
              direction="row"
              justifyContent="center"
            >
              {uploadLoading ? (
                <CircularProgress size={32} />
              ) : (
                <CloudUpload
                  fontSize="medium"
                  color={isDragActive ? "primary" : "action"}
                />
              )}
              <Box>
                <Typography variant="body1" color="text.primary">
                  {uploadLoading
                    ? "Uploading files..."
                    : isDragActive
                    ? "Drop files here"
                    : "Drop files here or click to select"}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {uploadLoading
                    ? "Please wait..."
                    : "Support for images, documents and other file types"}
                </Typography>
              </Box>
            </Stack>
            {error && (
              <Typography
                variant="caption"
                color="error"
                sx={{ mt: 1, display: "block" }}
              >
                {error.message}
              </Typography>
            )}
          </Box>
        )}
      </Dropzone>
    </Box>
  );
};
