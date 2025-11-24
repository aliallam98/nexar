// ============================================
// STEP 1: Install the official Vercel Blob SDK
// ============================================
// npm install @vercel/blob
// or
// yarn add @vercel/blob

// ============================================
// STEP 2: Update your .env file
// ============================================
// Remove NEXT_PUBLIC_ prefix from token (keep it server-side only)
/*
NEON_DATABASE_URL=postgresql://...
JWT_SECRET=ecommerce2025
NEXT_PUBLIC_GRAPHQL_ENDPOINT=http://localhost:3000/api/graphql
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xy0dxRmfWcWfq7af_PwY3oDkOoNvUuDxFZavrkG86AVg7Af
*/

// ============================================
// STEP 3: Create API Route for File Upload
// app/api/upload/route.ts
// ============================================
import { put, del, list } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";

// Upload file
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Upload to Vercel Blob
    const blob = await put(file.name, file, {
      access: "public", // or 'private'
      addRandomSuffix: true, // Add random suffix to prevent name conflicts
    });

    return NextResponse.json({
      url: blob.url,
      pathname: blob.pathname,
      contentType: blob.contentType,
      size: blob.size,
    });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: error.message || "Upload failed" },
      { status: 500 }
    );
  }
}

// List all files
export async function GET(request: NextRequest) {
  try {
    const { blobs } = await list({
      limit: 100,
    });

    return NextResponse.json({ files: blobs });
  } catch (error: any) {
    console.error("List error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to list files" },
      { status: 500 }
    );
  }
}

// Delete file
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get("url");

    if (!url) {
      return NextResponse.json({ error: "No URL provided" }, { status: 400 });
    }

    await del(url);

    return NextResponse.json({ message: "File deleted successfully" });
  } catch (error: any) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { error: error.message || "Delete failed" },
      { status: 500 }
    );
  }
}

// ============================================
// STEP 4: Create a utility function for uploads
// lib/blob-storage.ts
// ============================================
import { put, del, list, type PutBlobResult } from "@vercel/blob";

export class BlobStorage {
  /**
   * Upload a file to Vercel Blob Storage
   */
  static async uploadFile(file: File): Promise<PutBlobResult> {
    try {
      const blob = await put(file.name, file, {
        access: "public",
        addRandomSuffix: true,
      });
      return blob;
    } catch (error) {
      console.error("Upload failed:", error);
      throw new Error("Failed to upload file");
    }
  }

  /**
   * Upload with custom path
   */
  static async uploadWithPath(
    file: File,
    folder: string
  ): Promise<PutBlobResult> {
    const filename = `${folder}/${Date.now()}-${file.name}`;

    try {
      const blob = await put(filename, file, {
        access: "public",
      });
      return blob;
    } catch (error) {
      console.error("Upload failed:", error);
      throw new Error("Failed to upload file");
    }
  }

  /**
   * Delete a file from Vercel Blob Storage
   */
  static async deleteFile(url: string): Promise<void> {
    try {
      await del(url);
    } catch (error) {
      console.error("Delete failed:", error);
      throw new Error("Failed to delete file");
    }
  }

  /**
   * List all files
   */
  static async listFiles(options?: { limit?: number; prefix?: string }) {
    try {
      const { blobs } = await list({
        limit: options?.limit || 100,
        prefix: options?.prefix,
      });
      return blobs;
    } catch (error) {
      console.error("List failed:", error);
      throw new Error("Failed to list files");
    }
  }

  /**
   * Upload from Buffer (useful for server-side operations)
   */
  static async uploadBuffer(
    buffer: Buffer,
    filename: string,
    contentType?: string
  ): Promise<PutBlobResult> {
    try {
      const blob = await put(filename, buffer, {
        access: "public",
        contentType: contentType || "application/octet-stream",
        addRandomSuffix: true,
      });
      return blob;
    } catch (error) {
      console.error("Upload failed:", error);
      throw new Error("Failed to upload buffer");
    }
  }
}
