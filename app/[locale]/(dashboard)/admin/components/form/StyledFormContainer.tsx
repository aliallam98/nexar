// src/components/form/StyledFormContainer.tsx
import {
  Box,
  Paper,
  Stack,
  CircularProgress,
  Button,
  Grid,
  type BoxProps,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import {
  FormProvider,
  type UseFormReturn,
  type FieldValues,
} from "react-hook-form";
import type { ReactNode } from "react";
import { Done } from "@mui/icons-material";

// ========== StyledFormContainer ==========
interface StyledFormContainerProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  onSubmit: (data: T) => void | Promise<void>;
  loading?: boolean;
  hideSubmitButton?: boolean;
  hidePaperBg?: boolean;
  btnText?: string;
  submitComponents?: ReactNode;
  children: ReactNode;
  formHeaderText?: string;
  fullWidthSubmitButton?: boolean;
  hideSubmitIcon?: boolean;
}

// ========== FormButtonsContainer ==========
interface FormButtonsContainerProps {
  loading?: boolean;
  hideSubmitButton?: boolean;
  btnText?: string;
  submitComponents?: ReactNode;
  fullWidthSubmitButton?: boolean;
  hideSubmitIcon?: boolean;
}

export default function StyledFormContainer<T extends FieldValues>({
  form,
  onSubmit,
  loading = false,
  hideSubmitButton = false,
  hidePaperBg = false,
  btnText,
  submitComponents,
  children,
  formHeaderText,
  ...rest
}: StyledFormContainerProps<T> & BoxProps) {
  return (
    <FormProvider {...form}>
      <Paper
        component="form"
        onSubmit={form.handleSubmit(onSubmit)}
        {...rest}
        sx={{
          p: 2,
          position: "relative",
          overflow: "hidden",
          ...(hidePaperBg && { boxShadow: "none" }),
          ...rest.sx,
        }}
      >
        <Stack spacing={2}>
          {formHeaderText && (
            <Typography variant="h5" fontWeight={600} textAlign="center">
              {formHeaderText}
            </Typography>
          )}
          <Grid container spacing={2}>
            {children}
          </Grid>

          {/* Buttons */}
          <FormButtonsContainer
            loading={loading}
            hideSubmitButton={hideSubmitButton}
            btnText={btnText}
            submitComponents={submitComponents}
            fullWidthSubmitButton={rest.fullWidthSubmitButton}
            hideSubmitIcon={rest.hideSubmitIcon} // ✅ new
          />
        </Stack>
      </Paper>
    </FormProvider>
  );
}

export function FormButtonsContainer({
  loading = false,
  hideSubmitButton = false,
  btnText,
  submitComponents,
  fullWidthSubmitButton,
  hideSubmitIcon,
}: FormButtonsContainerProps) {
  const { t } = useTranslation("form");

  if (hideSubmitButton && !submitComponents) return null;

  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={2}
      mt={2}
      justifyContent="end"
      alignItems="center"
      flexWrap="wrap"
    >
      {!hideSubmitButton && (
        <Button
          variant="contained"
          size="large"
          type="submit"
          disabled={loading}
          startIcon={
            !hideSubmitIcon ? (
              loading ? (
                <CircularProgress size={16} color="inherit" />
              ) : (
                <Done />
              )
            ) : undefined
          }
          sx={{
            px: 4,
            borderRadius: "10px",
            width: fullWidthSubmitButton ? "100%" : { xs: "100%", sm: "auto" },
          }}
        >
          {t(btnText || "submit")}
        </Button>
      )}

      {submitComponents && (
        <Box sx={{ width: { xs: "100%", sm: "auto" } }}>{submitComponents}</Box>
      )}
    </Stack>
  );
}
