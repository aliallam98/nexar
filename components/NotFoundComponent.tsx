import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";
import { Stack } from "@mui/material";
import Link from "next/link";
import { MonitorOff } from "lucide-react";

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <Stack
      direction="column"
      alignItems="center"
      justifyContent="center"
      width="100%"
      height={"100%"}
      flex={1}
      spacing={3}
      textAlign="center"
    >
      <MonitorOff size={100} color="gray" />

      <Typography sx={{ color: "gray" }} variant="h6">
        {t("pageNotFound")}
      </Typography>

      <Link href="/admin" style={{ textDecoration: "none" }}>
        <Button variant="outlined" color="primary">
          {t("home")}
        </Button>
      </Link>
    </Stack>
  );
};

export default NotFoundPage;
