"use client";
import { useForm } from "react-hook-form";
import StyledFormContainer from "../../components/form/StyledFormContainer";
import { ImageInput } from "../../components/form/ImageInput";
import { Grid } from "@mui/material";
import TextInputComponent from "../../components/form/TextInputComponent";
import SelectComponent from "../../components/form/SelectComponent";
import SwitchInput from "../../components/form/SwitchInput";
import { useFileUpload } from "@/hooks/useFileUpload";

export const StaffForm = ({
  defaultValues,
  onSubmit,
  loading,
  isEdit = false,
}: {
  defaultValues?: any;
  onSubmit: (data: any) => void;
  loading?: boolean;
  isEdit?: boolean;
}) => {
  const form = useForm({
    defaultValues: defaultValues || {
      role: "ADMIN",
      isActive: true,
    },
  });

  const { uploadFile } = useFileUpload();

  const handleImageUpload = async (file: File): Promise<string | null> => {
    const result = await uploadFile(file);
    return result?.url || null;
  };

  const roleOptions = [
    { value: "ADMIN", label: "Admin" },
  ];

  return (
    <StyledFormContainer
      form={form}
      onSubmit={(data) => onSubmit(data)}
      loading={loading}
    >
      {/* Email - disabled on edit */}
      <Grid size={{ xs: 12, sm: 6 }}>
        <TextInputComponent
          name="email"
          label="Email"
          control={form.control}
          required
          disabled={isEdit}
        />
      </Grid>

      {/* Password - only show on create */}
      {!isEdit && (
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextInputComponent
            name="password"
            label="Password"
            type="password"
            control={form.control}
            required
          />
        </Grid>
      )}

      {/* Name */}
      <Grid size={{ xs: 12, sm: 6 }}>
        <TextInputComponent
          name="name"
          label="Name"
          control={form.control}
        />
      </Grid>

      {/* Phone */}
      <Grid size={{ xs: 12, sm: 6 }}>
        <TextInputComponent
          name="phone"
          label="Phone"
          control={form.control}
        />
      </Grid>

      {/* Role - shown for staff */}
      <Grid size={{ xs: 12, sm: 6 }}>
        <SelectComponent
          name="role"
          label="Role"
          control={form.control}
          selectData={roleOptions}
          required
        />
      </Grid>

      {/* Active Status */}
      <Grid size={{ xs: 12, sm: 6 }}>
        <SwitchInput
          name="isActive"
          label="Active"
          control={form.control}
        />
      </Grid>

      {/* Image */}
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
