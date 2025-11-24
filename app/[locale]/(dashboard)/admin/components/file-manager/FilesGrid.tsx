import { Delete, InsertDriveFile } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Checkbox,
  CircularProgress,
  Grid,
  IconButton,
  LinearProgress,
  Typography,
} from "@mui/material";

interface FileItem {
  _id: string;
  filename: string;
  originalName: string;
  mimetype: string;
  size: number;
  url: string;
  createdAt: string;
  isImage?: boolean;
  variants?: {
    thumbnail: string;
    original: string;
  };
  // For uploaded files
  isUploading?: boolean;
  uploadError?: string;
  progress?: number;
  isComplete?: boolean;
  preview?: string;
  file?: File;
}

interface FilesGridProps {
  files: FileItem[];
  selectedFiles: FileItem[];
  onSelectFile: (file: FileItem) => void;
  onRemoveFile: (fileId: string) => void;
}

export const FilesGrid = ({
  files,
  selectedFiles,
  onSelectFile,
  onRemoveFile,
}: FilesGridProps) => {
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getImageUrl = (file: FileItem) => {
    // For uploaded files with preview
    if (file.preview) {
      return file.preview;
    }

    // For existing files - images
    if (file.isImage && file.variants?.thumbnail) {
      return file.variants.thumbnail;
    }

    if (file.url) {
      return file.url;
    }

    return `http://localhost:3000/files/${file._id}${
      file.isImage ? "/thumbnail" : ""
    }`;
  };

  return (
    <Grid container spacing={2}>
      {files.map((file) => {
        const isUploaded = "file" in file;
        const isSelected = selectedFiles.some((f) => f._id === file._id);

        return (
          <Grid size={{ xs: 6, sm: 4, md: 3 }} key={file._id}>
            <Card sx={{ position: "relative" }}>
              {/* Selection checkbox - only for existing files */}
              {!isUploaded && (
                <Checkbox
                  checked={isSelected}
                  onChange={() => onSelectFile(file)}
                  sx={{
                    position: "absolute",
                    top: 4,
                    left: 4,
                    zIndex: 2,
                    bgcolor: "rgba(255,255,255,0.8)",
                    "&:hover": {
                      bgcolor: "rgba(255,255,255,0.9)",
                    },
                  }}
                />
              )}

              <Box sx={{ position: "relative" }}>
                {file.isImage ? (
                  <CardMedia
                    component="img"
                    height="120"
                    image={getImageUrl(file)}
                    alt={file.originalName}
                    sx={{
                      objectFit: "contain",
                    }}
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      if (e.currentTarget.nextElementSibling) {
                        (
                          e.currentTarget.nextElementSibling as HTMLElement
                        ).style.display = "flex";
                      }
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      height: 120,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      bgcolor: "grey.100",
                    }}
                  >
                    <InsertDriveFile sx={{ fontSize: 48, color: "grey.400" }} />
                  </Box>
                )}

                {/* Fallback for failed images */}
                <Box
                  sx={{
                    height: 120,
                    display: "none",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: "grey.100",
                  }}
                >
                  <InsertDriveFile sx={{ fontSize: 48, color: "grey.400" }} />
                </Box>

                {/* Upload progress overlay */}
                {file.isUploading && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      bgcolor: "rgba(255,255,255,0.8)",
                      borderRadius: "50%",
                      p: 1,
                    }}
                  >
                    <CircularProgress
                      size={32}
                      variant="determinate"
                      value={file.progress || 0}
                    />
                  </Box>
                )}

                {/* Upload error overlay */}
                {file.uploadError && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      bgcolor: "rgba(244, 67, 54, 0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      variant="caption"
                      color="error"
                      textAlign="center"
                      p={1}
                    >
                      Upload Failed
                    </Typography>
                  </Box>
                )}

                {/* Delete button - only for uploaded files */}
                {isUploaded && (
                  <IconButton
                    size="small"
                    onClick={() => onRemoveFile(file._id)}
                    disabled={file.isUploading}
                    sx={{
                      position: "absolute",
                      top: 4,
                      right: 4,
                      bgcolor: "rgba(255,255,255,0.8)",
                      "&:hover": {
                        bgcolor: "rgba(255,255,255,0.9)",
                      },
                    }}
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                )}
              </Box>

              <CardContent sx={{ p: 1 }}>
                <Typography
                  variant="caption"
                  sx={{
                    display: "block",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {file.originalName}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {formatFileSize(file.size)}
                </Typography>
                {file.isUploading && (
                  <LinearProgress
                    variant="determinate"
                    value={file.progress || 0}
                    sx={{ mt: 0.5 }}
                  />
                )}
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};
