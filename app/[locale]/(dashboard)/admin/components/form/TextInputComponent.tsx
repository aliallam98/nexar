import { InputAdornment, TextField, type TextFieldProps } from "@mui/material";
import {
  Controller,
  useFormContext,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { useTranslation } from "react-i18next";

export interface IProps<T extends FieldValues>
  extends Omit<TextFieldProps, "variant"> {
  name: Path<T>;
  label: string;
  variant?: "outlined" | "filled" | "standard";
  control: Control<T>;
  rules?: any;
  loading?: boolean;
  onChangeFn?: () => void;
  multiEntry?: boolean;
  setValue?: (name: Path<T>, value: any, options?: any) => void;
  required?: boolean;
}

const TextInputComponent = <T extends FieldValues>({
  name,
  label,
  control,
  variant,
  rules,
  loading,
  onChangeFn,
  multiEntry,
  setValue,
  required,
  ...rest
}: IProps<T>) => {
  const { t } = useTranslation(["main"]);
  // const { control, setValue } = useFormContext();

  const processMultiEntry = (value: string) => {
    return value
      .split(",")
      .map((i) => i.trim())
      .filter((i) => i !== "")
      .join(",");
  };

  const handleEnter = (
    e: KeyboardEvent<HTMLDivElement>,
    value: string,
    onChange: (val: string) => void
  ) => {
    if (e.key === "Enter") {
      const trimmed = value.trim();
      const endsWithComma = trimmed.endsWith(",");

      if (multiEntry && trimmed !== "" && !endsWithComma) {
        e.preventDefault();
        const newValue = `${trimmed},`;

        onChange(newValue);
        setValue?.(name, newValue);
      }
    }
  };

  if (loading) return <InputSkeletonWithSpinner />;

  return (
    <Controller
      name={name}
      control={control}
      rules={required ? { required: t("required") } : rules}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          autoComplete="off"
          value={field.value ?? ""}
          label={rules?.required || required ? `${t(label)} *` : t(label)}
          error={!!error}
          helperText={error?.message}
          size="small"
          fullWidth
          variant={variant || "filled"}
          onChange={(e) => {
            const newVal = multiEntry
              ? processMultiEntry(e.target.value)
              : e.target.value;
            field.onChange(newVal);
            setValue?.(name, newVal);
            onChangeFn?.();
          }}
          onPaste={(e) => {
            if (!multiEntry) return;
            e.preventDefault();
            const pasted = e.clipboardData.getData("text").replace(/\n/g, ",");
            const inputValue = (field.value ?? "") + pasted;
            const processed = processMultiEntry(inputValue);
            setValue?.(name, processed);
            field.onChange(processed);
          }}
          onKeyDown={(e) => handleEnter(e, field.value ?? "", field.onChange)}
          {...rest}
        />
      )}
    />
  );
};

export default TextInputComponent;

import { CircularProgress } from "@mui/material";
import type { KeyboardEvent } from "react";

export const InputSkeletonWithSpinner = () => {
  return (
    <TextField
      fullWidth
      disabled
      label="Loading"
      variant="filled"
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <CircularProgress size={20} />
            </InputAdornment>
          ),
        },
      }}
    />
  );
};
