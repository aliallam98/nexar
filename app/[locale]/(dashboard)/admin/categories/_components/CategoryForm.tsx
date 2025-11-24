"use client";
import { useForm } from "react-hook-form";
import StyledFormContainer from "../../components/form/StyledFormContainer";
import { ImageInput } from "../../components/form/ImageInput";
import { Grid } from "@mui/material";
import TextInputComponent from "../../components/form/TextInputComponent";
import { CreateCategoryInput } from "@/graphql/types";
import { useFileUpload } from "@/hooks/useFileUpload"; // Import your hook

export const CategoryForm = ({
  defaultValues,
  onSubmit,
  loading,
}: {
  defaultValues?: CreateCategoryInput;
  onSubmit: (data: any) => void;
  loading?: boolean;
}) => {
  const form = useForm({
    defaultValues: defaultValues || {},
  });

  console.log({ defaultValues });

  const { uploadFile } = useFileUpload();

  const handleImageUpload = async (file: File): Promise<string | null> => {
    const result = await uploadFile(file);
    return result?.url || null;
  };

  return (
    <StyledFormContainer
      form={form}
      onSubmit={(data) => onSubmit(data)}
      loading={loading}
    >
      <Grid size={{ xs: 12, sm: 6 }}>
        <TextInputComponent
          name="name"
          label="name"
          control={form.control}
          required
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <TextInputComponent
          name="description"
          label="description"
          control={form.control}
          multiline
          rows={3}
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <ImageInput
          name="image"
          control={form.control}
          onUpload={handleImageUpload}
        />
      </Grid>
    </StyledFormContainer>
  );
};
