import { ChevronLeft, ChevronRight, Clear } from "@mui/icons-material";
import {
  DatePicker,
  DatePickerProps,
  CalendarIcon,
  DateValidationError,
} from "@mui/x-date-pickers";
import {
  FormControl,
  FormHelperText,
  IconButton,
  TextFieldProps,
  useTheme,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { isValid, isBefore, isAfter, startOfDay } from "date-fns";
import { useRef, useState } from "react";
import { Control, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import useWidth, { isWidthDown } from "../../../_hooks/useWidth";
import { arEG, enAU } from "date-fns/locale";

export interface IProps extends Omit<DatePickerProps, "onChange" | "value"> {
  name: string;
  label: string;
  control?: Control<any>;
  onChangeFunction?: () => void;
  showDefault?: boolean;
  inputProps?: TextFieldProps;
  clearable?: boolean;
  // Additional validation props
  disableFuture?: boolean;
  disablePast?: boolean;
  minDate?: Date;
  maxDate?: Date;
  required?: boolean;
  defaultToday?: boolean;
  shouldDisableDate?: (day: Date) => boolean;
  onError?: (error: DateValidationError) => void;
}

const DatePickerComponent = ({
  control,
  name,
  label,
  onChangeFunction,
  showDefault = true,
  inputProps,
  clearable = true,
  disableFuture = false,
  disablePast = false,
  minDate,
  maxDate,
  required = false,
  defaultToday,
  shouldDisableDate,
  onError,
  disabled,
  ...restprops
}: IProps) => {
  const { i18n, t } = useTranslation(["translation", "validation"]);
  const localeMap = {
    ar: arEG,
    en: enAU,
  };
  const locale = localeMap[i18n.language as "ar" | "en"] || enAU;
  const [isOpen, setIsOpen] = useState(false);
  const screenWidth = useWidth();
  const isMobile = isWidthDown("sm", screenWidth);
  const dateRef = useRef<HTMLInputElement>(null);
  const { direction } = useTheme();

  // Validation function that checks all date standards
  const validateDate = (value: Date | null): string | true => {
    // Check if required
    if (required && !value) {
      return t("validation:fieldIsRequired") || "This field is required";
    }

    // If not required and empty, it's valid
    if (!value) {
      return true;
    }

    // Check if it's a valid date object
    if (!isValid(value)) {
      return t("validation:invalidDate") || "Invalid date";
    }

    // Check year range first (must be between 1000 and 9999)
    const year = value.getFullYear();
    if (year < 1000 || year > 9999) {
      return t("validation:invalidYear") || "Please enter a valid year";
    }

    // Check if date is disabled by custom function
    if (shouldDisableDate && shouldDisableDate(value)) {
      return t("shouldDisableDate");
    }

    // Check if date is in the past when disablePast is true
    if (disablePast) {
      const today = startOfDay(new Date());
      if (isBefore(startOfDay(value), today)) {
        return (
          t("validation:pastDateNotAllowed") || "Past dates are not allowed"
        );
      }
    }

    // Check if date is in the future when disableFuture is true
    if (disableFuture) {
      const today = startOfDay(new Date());
      if (isAfter(startOfDay(value), today)) {
        return (
          t("validation:futureDateNotAllowed") || "Future dates are not allowed"
        );
      }
    }

    // Check minDate constraint
    if (minDate && isBefore(startOfDay(value), startOfDay(minDate))) {
      return (
        t("validation:dateBeforeMin", {
          minDate: minDate.toLocaleDateString(i18n.language),
        }) || `Date must be after ${minDate.toLocaleDateString()}`
      );
    }

    // Check maxDate constraint
    if (maxDate && isAfter(startOfDay(value), startOfDay(maxDate))) {
      return (
        t("validation:dateAfterMax", {
          maxDate: maxDate.toLocaleDateString(i18n.language),
        }) || `Date must be before ${maxDate.toLocaleDateString()}`
      );
    }

    // Check if date is within reasonable range (year 1900 to 2100)
    if (year < 1900 || year > 2100) {
      return (
        t("validation:dateOutOfRange") ||
        "Date is out of valid range (1900-2100)"
      );
    }

    return true;
  };

  return (
    <Controller
      control={control}
      name={name}
      rules={{
        validate: validateDate,
      }}
      render={({
        field: { onChange: fieldChange, value: fieldValue },
        fieldState: { error },
      }) => {
        const [internalError, setInternalError] = useState<string | null>(null);
        const displayError =
          error || (internalError ? { message: internalError } : null);

        return (
          <LocalizationProvider
            dateAdapter={AdapterDateFns}
            adapterLocale={locale}
          >
            <FormControl
              variant="filled"
              fullWidth
              size="small"
              error={Boolean(displayError)}
            >
              <DatePicker
                slots={{
                  leftArrowIcon: () =>
                    direction === "rtl" ? <ChevronRight /> : <ChevronLeft />,
                  rightArrowIcon: () =>
                    direction === "rtl" ? <ChevronLeft /> : <ChevronRight />,
                }}
                localeText={{
                  okButtonLabel: t("confirm"),
                  cancelButtonLabel: t("cancel"),
                  previousMonth: t("previousMonth"),
                  nextMonth: t("nextMonth"),
                }}
                slotProps={{
                  textField: {
                    variant: "filled",
                    fullWidth: true,
                    onFocus: isMobile ? () => setIsOpen(true) : undefined,
                    InputProps: {
                      endAdornment: (
                        <IconButton
                          onClick={() => setIsOpen(true)}
                          disabled={inputProps?.disabled || disabled}
                        >
                          <CalendarIcon fontSize="medium" />
                        </IconButton>
                      ),
                    },
                    error: Boolean(displayError),

                    ...inputProps,
                  },
                  popper: {
                    sx: {
                      "& .MuiDayCalendar-header , .MuiPickersSlideTransition-root":
                        {
                          direction,
                        },
                    },
                  },
                }}
                ref={dateRef}
                label={t(label)}
                value={fieldValue || null}
                onChange={(newValue) => {
                  // Validate the new value
                  const validationResult = validateDate(newValue);

                  if (validationResult === true) {
                    setInternalError(null);
                  } else {
                    setInternalError(validationResult);
                  }

                  // Always update the field to trigger form validation
                  fieldChange(newValue);
                  if (onChangeFunction) {
                    onChangeFunction();
                  }
                }}
                onError={(error) => {
                  // Handle MUI DatePicker built-in errors and map them to custom messages
                  if (error) {
                    let errorMessage: string;

                    switch (error) {
                      case "invalidDate":
                        errorMessage =
                          t("validation:invalidDate") || "Invalid date";
                        break;
                      case "disablePast":
                        errorMessage =
                          t("validation:pastDateNotAllowed") ||
                          "Past dates are not allowed";
                        break;
                      case "disableFuture":
                        errorMessage =
                          t("validation:futureDateNotAllowed") ||
                          "Future dates are not allowed";
                        break;
                      case "minDate":
                        errorMessage =
                          t("validation:dateBeforeMin", {
                            minDate: minDate?.toLocaleDateString(i18n.language),
                          }) || "Date is before minimum allowed date";
                        break;
                      case "maxDate":
                        errorMessage =
                          t("validation:dateAfterMax", {
                            maxDate: maxDate?.toLocaleDateString(i18n.language),
                          }) || "Date is after maximum allowed date";
                        break;
                      case "shouldDisableDate":
                        errorMessage = t("shouldDisableDate");
                        break;
                      default:
                        errorMessage =
                          t("validation:invalidDate") || "Invalid date";
                    }

                    setInternalError(errorMessage);
                    if (onError) {
                      onError(error);
                    }
                  } else {
                    setInternalError(null);
                  }
                }}
                shouldDisableDate={shouldDisableDate}
                disableFuture={disableFuture}
                disablePast={disablePast}
                minDate={minDate}
                maxDate={maxDate}
                onClose={() => setIsOpen(false)}
                open={isOpen}
                closeOnSelect
                disabled={disabled}
                {...restprops}
              />

              {displayError && (
                <FormHelperText>{displayError.message}</FormHelperText>
              )}

              {fieldValue && clearable && !disabled && (
                <IconButton
                  onClick={() => {
                    setInternalError(null);
                    fieldChange(null);
                  }}
                  sx={{
                    position: "absolute",
                    right: 45,
                    top: "50%",
                    transform: "translateY(-50%)",
                    p: 0.5,
                  }}
                >
                  <Clear fontSize="small" />
                </IconButton>
              )}

              {/* <IconButton
                onClick={() => setIsOpen(true)}
                disabled={inputProps?.disabled}
                sx={{
                  position: "absolute",
                  right: 17,
                  top: "50%",
                  transform: "translateY(-50%)",
                  p: 0.5,
                }}
              >
                <CalendarIcon fontSize="medium" />
              </IconButton> */}
            </FormControl>
          </LocalizationProvider>
        );
      }}
    />
  );
};

export default DatePickerComponent;
//Examples
// Basic usage with validation
{
  /* <DatePickerComponent
  name="birthDate"
  label="Birth Date"
  control={control}
  required
  disableFuture 
/>

// Date range validation
<DatePickerComponent
  name="appointmentDate"
  label="Appointment Date"
  control={control}
  disablePast
  minDate={new Date()}
  maxDate={new Date(2025, 11, 31)}
/>

// No validation (optional field)
<DatePickerComponent
  name="optionalDate"
  label="Optional Date"
  control={control}
/> */
}
