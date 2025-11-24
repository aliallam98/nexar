import {
  InputAdornment,
  TextField,
  TextFieldProps,
  CircularProgress,
} from "@mui/material";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { forwardRef } from "react";
import { NumericFormat, NumericFormatProps } from "react-number-format";

interface IProps<T extends FieldValues>
  extends Omit<TextFieldProps, "variant"> {
  name: Path<T>;
  label: string;
  variant?: "outlined" | "filled" | "standard";
  control: Control<T>;
  rules?: any;
  loading?: boolean;
  onChangeFn?: (e: any) => void;
  setValue?: (name: Path<T>, value: any, options?: any) => void;
  required?: boolean;
  currencyAdornment?: string;
  allowNegative?: boolean;
  decimalScale?: number;
  fixedDecimalScale?: boolean;
  prefix?: string;
  suffix?: string;
}

// Numeric Format Component
interface NumericFormatCustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
  allowNegative?: boolean;
  decimalScale?: number;
  fixedDecimalScale?: boolean;
  prefix?: string;
  suffix?: string;
}
const NumericFormatCustom = forwardRef<
  NumericFormatProps,
  NumericFormatCustomProps
>(function NumericFormatCustom(props, ref) {
  const {
    onChange,
    name,
    allowNegative = true,
    decimalScale,
    fixedDecimalScale = false,
    prefix,
    suffix,
    ...other
  } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: name,
            value: values.value, // Raw numeric value
          },
        });
      }}
      thousandSeparator=","
      valueIsNumericString
      allowNegative={allowNegative}
      decimalScale={decimalScale}
      fixedDecimalScale={fixedDecimalScale}
      prefix={prefix}
      suffix={suffix}
    />
  );
});

const NumberFormatTextInputComponent = <T extends FieldValues>({
  name,
  label,
  control,
  variant,
  required = false,
  rules,
  loading,
  onChangeFn,
  setValue,
  currencyAdornment,
  allowNegative = true,
  decimalScale,
  fixedDecimalScale = false,
  prefix,
  suffix,
  ...rest
}: IProps<T>) => {
  const { t } = useTranslation();

  if (loading) return <InputSkeletonWithSpinner />;

  return (
    <Controller
      name={name}
      control={control}
      rules={required ? { required: t("fieldIsRequired") } : rules}
      render={({ field, fieldState: { error } }) => {
        const inputPropsWithAdornment = {
          ...rest.InputProps,
          inputComponent: NumericFormatCustom as any,
          inputProps: {
            allowNegative,
            decimalScale,
            fixedDecimalScale,
            prefix,
            suffix,
          },
          endAdornment: currencyAdornment ? (
            <InputAdornment position="end">{currencyAdornment}</InputAdornment>
          ) : (
            rest.InputProps?.endAdornment
          ),
        };

        return (
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
            InputProps={inputPropsWithAdornment}
            onChange={(e) => {
              field.onChange(e);
              setValue?.(name, e.target.value);
              onChangeFn?.(e);
            }}
            {...rest}
          />
        );
      }}
    />
  );
};

export default NumberFormatTextInputComponent;

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
