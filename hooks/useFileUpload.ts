import { useState } from "react";
import { toast } from "sonner";

interface UploadResult {
  url: string;
  pathname: string;
  contentType: string;
  size: number;
}

export function useFileUpload() {
  const [uploading, setUploading] = useState(false);

  const uploadFile = async (file: File): Promise<UploadResult | null> => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/files", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Upload failed");
      }

      const data = await response.json();
      toast.success("File uploaded successfully");
      return data;
    } catch (error: any) {
      console.error("Upload error:", error);
      toast.error(error.message || "Upload failed");
      return null;
    } finally {
      setUploading(false);
    }
  };

  const deleteFile = async (url: string): Promise<boolean> => {
    try {
      const response = await fetch(
        `/api/upload?url=${encodeURIComponent(url)}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Delete failed");
      }

      toast.success("File deleted successfully");
      return true;
    } catch (error: any) {
      console.error("Delete error:", error);
      toast.error(error.message || "Delete failed");
      return false;
    }
  };

  return { uploadFile, deleteFile, uploading };
}
