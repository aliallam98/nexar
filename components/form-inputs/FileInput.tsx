/* eslint-disable @typescript-eslint/no-explicit-any */
import { CloudUpload, X } from "lucide-react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadList,
  FileUploadRootProps,
  FileUploadTrigger,
} from "./FileUpload";
import { Button } from "../ui/button";

interface IProps extends FileUploadRootProps {
  control: any;
  setError: any;
}

const FileInput = ({ control, setError, ...rest }: IProps) => {
  return (
    <FormField
      control={control}
      name="files"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Attachments</FormLabel>
          <FormControl>
            <FileUpload
              name="files"
              label="files"
              value={field.value}
              onValueChange={field.onChange}
              accept="image/*"
              maxFiles={2}
              maxSize={5 * 1024 * 1024}
              onFileReject={(_, message) => {
                setError("files", {
                  message,
                });
              }}
              multiple
              {...rest}
            >
              <FileUploadDropzone className="flex-row flex-wrap border-dotted text-center">
                <CloudUpload className="size-4" />
                Drag and drop or
                <FileUploadTrigger asChild>
                  <Button variant="link" size="sm" className="p-0">
                    choose files
                  </Button>
                </FileUploadTrigger>
                to upload
              </FileUploadDropzone>
              <FileUploadList>
                {field.value.map((file, index) => (
                  <FileUploadItem key={index} value={file}>
                    <FileUploadItemPreview />
                    <FileUploadItemMetadata />
                    <FileUploadItemDelete asChild>
                      <Button variant="ghost" size="icon" className="size-7">
                        <X />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </FileUploadItemDelete>
                  </FileUploadItem>
                ))}
              </FileUploadList>
            </FileUpload>
          </FormControl>
          <FormDescription>
            Upload up to 2 images up to 5MB each.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FileInput;
