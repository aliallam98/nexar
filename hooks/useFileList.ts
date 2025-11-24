import { useState, useEffect } from "react";

interface BlobFile {
  url: string;
  pathname: string;
  size: number;
  uploadedAt: Date;
  contentType?: string;
}

export function useFileList(prefix?: string) {
  const [files, setFiles] = useState<BlobFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFiles = async () => {
    setLoading(true);
    setError(null);
    try {
      const url = prefix
        ? `/api/files?prefix=${encodeURIComponent(prefix)}`
        : "/api/files";

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to fetch files");
      }

      const data = await response.json();
      setFiles(data.files || []);
    } catch (err: any) {
      console.error("Fetch files error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, [prefix]);

  return { files, loading, error, refetch: fetchFiles };
}
