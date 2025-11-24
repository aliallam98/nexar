import {
  TextField,
  MenuItem,
  type TextFieldVariants,
  type TextFieldProps,
} from "@mui/material";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { useTranslation } from "react-i18next";

interface SelectOption {
  value: string;
  label: string;
}

interface IProps<T extends FieldValues>
  extends Omit<TextFieldProps, "variant" | "name"> {
  name: Path<T>;
  label: string;
  control: Control<T>;
  rules?: any;
  selectData: SelectOption[];
  variant?: TextFieldVariants; // ✅ type-safe: "filled" | "outlined" | "standard"
}

const SelectComponent = <T extends FieldValues>({
  control,
  name,
  label,
  rules,
  selectData,
  variant = "filled",
  ...rest
}: IProps<T>) => {
  const { t } = useTranslation();

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          select
          label={rules?.required ? `${t(label)} *` : t(label)}
          fullWidth
          size="small"
          variant={variant}
          error={!!error}
          helperText={error?.message}
          {...rest}
        >
          {selectData.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  );
};

export default SelectComponent;
