import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormHelperText,
} from "@mui/material";
import { Controller } from "react-hook-form";

export interface IProps {
  control: any;
  name: string;
  label: string;
  options: { label: string; value: string | number }[];
  defaultValue?: string | number;
  disabled?: boolean;
}

export default function SelectInputComponent({
  control,
  name,
  label,
  options,
  defaultValue = "",
  disabled = false,
}: IProps) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <FormControl fullWidth size="small" error={!!error} disabled={disabled}>
          <InputLabel>{label}</InputLabel>
          <Select
            value={value}
            label={label}
            onChange={onChange}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          {error && <FormHelperText>{error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
}
