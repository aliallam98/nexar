import {
  FormControlLabel,
  styled,
  Switch,
  type SwitchProps,
} from "@mui/material";
import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { useTranslation } from "react-i18next";

export const Android12Switch = styled(Switch)(({ theme }) => ({
  padding: 8,
  "& .MuiSwitch-track": {
    borderRadius: 22 / 2,
    "&::before, &::after": {
      content: '""',
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: 16,
      height: 16,
    },
    "&::before": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12,
    },
    "&::after": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12,
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "none",
    width: 16,
    height: 16,
    margin: 2,
  },
}));

export const FormControlLabelStyle = styled(FormControlLabel)(() => ({
  width: "fit-content",
  margin: 0,
  justifyContent: "space-between",
  ".MuiSwitch-switchBase": {
    padding: 0,
    top: "9px",
    left: "9px",
  },
}));

interface IProps<T extends FieldValues> extends Omit<SwitchProps, "name"> {
  name: Path<T>;
  label: string;
  control: Control<T>;
  loading?: boolean;
  onChangeFn?: () => void;
}

const SwitchInput = <T extends FieldValues>({
  name,
  label,
  control,
  loading,
  onChangeFn,
  ...rest
}: IProps<T>) => {
  const { t } = useTranslation();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControlLabelStyle
          control={
            <Android12Switch
              sx={{
                marginRight: 0.5,
              }}
              color="primary"
              checked={loading ? false : field.value}
              disabled={loading}
              {...field}
              onChange={(e) => {
                field.onChange(e.target.checked);
                if (onChangeFn) {
                  onChangeFn();
                }
              }}
              value={field.value}
              inputProps={{ "aria-label": String(name) }}
              {...rest}
            />
          }
          label={t(label)}
        />
      )}
    />
  );
};

export default SwitchInput;
