import { useAuth } from "../../context/AuthContext";
import { useUploadMultipleFilesMutation } from "../../graphql/mutations/file/files.generated";
import {
  FilesDocument,
  useFilesQuery,
} from "../../graphql/queries/file/files.generated";
import FileManager from "./FileManager";

type ExistingFile = {
  _id: string;
  filename: string;
  originalName: string;
  mimetype: string;
  size: number;
  url: string;
  createdAt: string;
  isSelected?: boolean;
  variants?: {
    thumbnail: string;
    original: string;
  };
};

const FileManagerWrapper = ({
  open = true,
  onClose,
  onFilesSelected,
}: {
  open?: boolean;
  onClose?: () => void;
  onFilesSelected?: (files: ExistingFile[]) => void;
}) => {
  const { user } = useAuth();

  // Query existing files
  const {
    data: filesData,
    loading: filesLoading,
    refetch: refetchFiles,
  } = useFilesQuery({
    variables: {
      limit: 20,
      page: 1,
    },
    fetchPolicy: "cache-and-network", // Ensure we get fresh data
  });

  // Upload mutation
  const [uploadMultipleFilesMutation, { loading: uploadLoading }] =
    useUploadMultipleFilesMutation();

  // Transform the GraphQL response to match our component interface
  const existingFiles: ExistingFile[] =
    filesData?.files?.data?.map((file: any) => ({
      _id: file._id,
      filename: file.filename,
      // Fix the originalName mapping - it should be 'originalname' from the API
      originalName: file.originalname || file.filename,
      mimetype: file.mimetype,
      size: file.size,
      // The API response shows url: null, so we'll construct it from variants
      url: `http://localhost:3000/files/${file._id}`,
      createdAt: file.createdAt,
      isImage: file.isImage,
      variants: file.variants
        ? {
            thumbnail: `http://localhost:3000/files/${file._id}/thumbnail`,
            original: `http://localhost:3000/files/${file._id}`,
          }
        : undefined,
    })) || [];

  const onUploadMultipleFiles = async (files: File[]) => {
    try {
      const { data } = await uploadMultipleFilesMutation({
        awaitRefetchQueries: true,
        refetchQueries: [
          {
            query: FilesDocument,
            variables: {
              limit: 20,
              page: 1,
            },
          },
        ],
        variables: {
          files: files,
          userId: user?._id,
        },
        context: {
          headers: {
            "x-apollo-operation-name": "UploadMultipleFiles",
            "Apollo-Require-Preflight": "true",
          },
        },
      });

      if (data?.uploadMultipleFiles?.success) {
        console.log("Files uploaded successfully!");
        // Refetch the files list to show newly uploaded files
        // await refetchFiles();
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      console.error("Upload failed:", error);
      throw error;
    }
  };

  const handleClose = () => {
    onClose?.();
  };

  const handleFilesSelected = (selectedFiles: ExistingFile[]) => {
    onFilesSelected?.(selectedFiles);
    console.log("Selected files from wrapper:", selectedFiles);
  };

  return (
    <FileManager
      open={open}
      onClose={handleClose}
      onUploadMultipleFiles={onUploadMultipleFiles}
      uploadLoading={uploadLoading}
      existingFiles={existingFiles}
      filesLoading={filesLoading}
      onFilesSelected={handleFilesSelected}
    />
  );
};

export default FileManagerWrapper;
