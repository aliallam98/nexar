import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Box,
  Typography,
  Button,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { FileManagerHeader } from "./FileManagerHeader";
import { FileUploadZone } from "./FileUploadZone";
import { FilesGrid } from "./FilesGrid";
import { FilesList } from "./FilesList";

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

type ExistingFile = {
  _id: string;
  filename: string;
  originalName: string;
  mimetype: string;
  size: number;
  url: string;
  createdAt: string;
  isSelected?: boolean;
  isImage?: boolean;
  variants?: {
    thumbnail: string;
    original: string;
  };
};

type ViewType = "grid" | "list";

const FileManager = ({
  onUploadMultipleFiles,
  uploadLoading = false,
  open = true,
  onClose,
  existingFiles = [],
  filesLoading = false,
  onFilesSelected,
}: {
  onUploadMultipleFiles: (files: File[]) => Promise<void>;
  uploadLoading?: boolean;
  open?: boolean;
  onClose?: () => void;
  existingFiles?: ExistingFile[];
  filesLoading?: boolean;
  onFilesSelected?: (files: ExistingFile[]) => void;
}) => {
  const { control } = useForm();
  const [uploadingFiles, setUploadingFiles] = useState<FileWithProgress[]>([]);
  const [selectedExistingFiles, setSelectedExistingFiles] = useState<
    ExistingFile[]
  >([]);
  const [viewType, setViewType] = useState<ViewType>("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [filterSize, setFilterSize] = useState("all");

  // Only show existing files from server - don't mix with uploading files
  const allFiles = existingFiles;

  // Filter files based on search query
  const filteredFiles = allFiles.filter((file) =>
    file.originalName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFilesChange = (newFiles: FileWithProgress[]) => {
    setUploadingFiles(newFiles);
  };

  const handleRemoveFile = (fileId: string) => {
    setUploadingFiles((prev) => prev.filter((file) => file.id !== fileId));
  };

  const handleSelectExistingFile = (file: ExistingFile) => {
    setSelectedExistingFiles((prev) => {
      const isSelected = prev.some((f) => f._id === file._id);
      if (isSelected) {
        // Remove file from selection - maintain order of remaining files
        return prev.filter((f) => f._id !== file._id);
      } else {
        // Add file to end of selection array - this maintains selection order
        return [...prev, file];
      }
    });
  };

  const handleSelectAllFiles = () => {
    if (selectedExistingFiles.length === filteredFiles.length) {
      setSelectedExistingFiles([]);
    } else {
      // When selecting all, use the current filtered order
      setSelectedExistingFiles([...filteredFiles]);
    }
  };

  const handleUseSelectedFiles = () => {
    // Files are already in selection order (first clicked = index 0)
    onFilesSelected?.(selectedExistingFiles);
    onClose?.();
  };

  const handleUpload = async (files: File[]) => {
    try {
      await onUploadMultipleFiles(files);
      // Clear uploading files after successful upload
      setUploadingFiles([]);
    } catch (error) {
      console.error("Upload failed:", error);
      throw error;
    }
  };

  const hasSelectedFiles = selectedExistingFiles.length > 0;
  const isProcessing =
    uploadLoading || uploadingFiles.some((f) => f.isUploading);

  return (
    <>
      <Dialog open={open} maxWidth="lg" fullWidth onClose={onClose}>
        <DialogTitle>Select Files</DialogTitle>
        <DialogContent sx={{ p: 0 }}>
          {/* Sticky Header */}
          <Box
            sx={{
              position: "sticky",
              top: 0,
              zIndex: 1000,
              bgcolor: "background.paper",
              borderBottom: "1px solid",
              borderColor: "divider",
              p: 3,
              pb: 2,
            }}
          >
            <FileManagerHeader
              control={control}
              viewType={viewType}
              onViewChange={setViewType}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              sortBy={sortBy}
              onSortChange={setSortBy}
              filterSize={filterSize}
              onFilterSizeChange={setFilterSize}
            />
          </Box>

          <Box sx={{ p: 3, pt: 2 }}>
            <FileUploadZone
              control={control}
              onFilesChange={handleFilesChange}
              onUpload={handleUpload}
              uploadLoading={uploadLoading}
            />
          </Box>

          {/* Files Content */}
          <Box sx={{ p: 3, pt: 2 }}>
            {filesLoading ? (
              <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
                <CircularProgress size={48} />
                <Typography variant="h6" sx={{ ml: 2, alignSelf: "center" }}>
                  Loading files...
                </Typography>
              </Box>
            ) : (
              <Box>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ mb: 2 }}
                >
                  <Typography variant="h6">
                    Media Library ({filteredFiles.length})
                    {uploadLoading && (
                      <Typography
                        component="span"
                        variant="caption"
                        color="primary"
                        sx={{ ml: 1 }}
                      >
                        (uploading...)
                      </Typography>
                    )}
                    {hasSelectedFiles && (
                      <Typography
                        component="span"
                        variant="caption"
                        color="text.secondary"
                        sx={{ ml: 1 }}
                      >
                        - {selectedExistingFiles.length} selected (first
                        selected will be main)
                      </Typography>
                    )}
                  </Typography>
                  {filteredFiles.length > 0 && (
                    <Button
                      size="small"
                      onClick={handleSelectAllFiles}
                      variant="outlined"
                    >
                      {selectedExistingFiles.length === filteredFiles.length
                        ? "Deselect All"
                        : "Select All"}
                    </Button>
                  )}
                </Stack>

                {viewType === "grid" ? (
                  <FilesGrid
                    files={filteredFiles}
                    selectedFiles={selectedExistingFiles}
                    onSelectFile={handleSelectExistingFile}
                    onRemoveFile={handleRemoveFile}
                  />
                ) : (
                  <FilesList
                    files={filteredFiles}
                    selectedFiles={selectedExistingFiles}
                    onSelectFile={handleSelectExistingFile}
                    onRemoveFile={handleRemoveFile}
                  />
                )}

                {/* Show message when no files and not loading */}
                {filteredFiles.length === 0 &&
                  !filesLoading &&
                  !uploadLoading && (
                    <Box sx={{ textAlign: "center", py: 4 }}>
                      <Typography variant="body1" color="text.secondary">
                        {searchQuery
                          ? "No files match your search"
                          : "No files uploaded yet"}
                      </Typography>
                    </Box>
                  )}
              </Box>
            )}

            {/* Upload Progress Indicator */}
            {uploadLoading && (
              <Box
                sx={{ mt: 2, p: 2, bgcolor: "action.hover", borderRadius: 1 }}
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 1 }}
                >
                  Uploading files to server...
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <CircularProgress size={16} />
                  <Typography variant="caption">
                    Please wait while files are being processed...
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={onClose} disabled={isProcessing}>
            Cancel
          </Button>
          {hasSelectedFiles && (
            <Button
              variant="contained"
              onClick={handleUseSelectedFiles}
              disabled={isProcessing}
            >
              Use Selected ({selectedExistingFiles.length})
            </Button>
          )}
        </DialogActions>
      </Dialog>

      {/* Backdrop for upload loading */}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={uploadLoading && !open}
      >
        <Box sx={{ textAlign: "center" }}>
          <CircularProgress color="inherit" />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Uploading files...
          </Typography>
        </Box>
      </Backdrop>
    </>
  );
};

export default FileManager;
