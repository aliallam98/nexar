import { Delete, InsertDriveFile } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Checkbox,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
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

interface FilesListProps {
  files: FileItem[];
  selectedFiles: FileItem[];
  onSelectFile: (file: FileItem) => void;
  onRemoveFile: (fileId: string) => void;
}
export const FilesList = ({
  files,
  selectedFiles,
  onSelectFile,
  onRemoveFile,
}: FilesListProps) => {
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getImageUrl = (file: FileItem) => {
    if (file.preview) {
      return file.preview;
    }

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
    <List>
      {files.map((file) => {
        const isUploaded = "file" in file;
        const isSelected = selectedFiles.some((f) => f._id === file._id);

        return (
          <ListItem key={file._id} divider sx={{ py: 1.5 }}>
            {/* Selection checkbox - only for existing files */}
            {!isUploaded && (
              <Checkbox
                checked={isSelected}
                onChange={() => onSelectFile(file)}
                sx={{ mr: 1 }}
              />
            )}

            {/* File icon or image preview */}
            <ListItemIcon sx={{ minWidth: 72 }}>
              {file.isImage ? (
                <Avatar
                  src={getImageUrl(file)}
                  variant="rounded"
                  sx={{
                    width: 56,
                    height: 56,
                    bgcolor: "grey.100",
                    "& img": {
                      objectFit: "cover",
                    },
                  }}
                  onError={(e) => {
                    // Fallback to file icon if image fails to load
                    e.currentTarget.style.display = "none";
                  }}
                >
                  <InsertDriveFile sx={{ fontSize: 28, color: "grey.400" }} />
                </Avatar>
              ) : (
                <Avatar
                  variant="rounded"
                  sx={{
                    width: 56,
                    height: 56,
                    bgcolor: "grey.100",
                  }}
                >
                  <InsertDriveFile sx={{ fontSize: 28, color: "grey.400" }} />
                </Avatar>
              )}
            </ListItemIcon>

            <ListItemText
              primary={
                <Typography
                  variant="body2"
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    maxWidth: "300px",
                  }}
                >
                  {file.originalName}
                </Typography>
              }
              secondary={
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    {formatFileSize(file.size)}
                  </Typography>
                  {file.isUploading && (
                    <>
                      <LinearProgress
                        variant="determinate"
                        value={file.progress || 0}
                        sx={{ mt: 0.5, width: "200px" }}
                      />
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ display: "block" }}
                      >
                        Uploading... {Math.round(file.progress || 0)}%
                      </Typography>
                    </>
                  )}
                  {file.uploadError && (
                    <Typography
                      variant="caption"
                      color="error"
                      sx={{ mt: 0.5, display: "block" }}
                    >
                      Upload failed: {file.uploadError}
                    </Typography>
                  )}
                </Box>
              }
            />

            {/* Delete button - only for uploaded files */}
            {isUploaded && (
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  onClick={() => onRemoveFile(file._id)}
                  disabled={file.isUploading}
                >
                  <Delete />
                </IconButton>
              </ListItemSecondaryAction>
            )}
          </ListItem>
        );
      })}
    </List>
  );
};
