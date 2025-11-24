import { Box, CircularProgress, Typography } from "@mui/material";

export const FullScreenLoading: React.FC<{ message?: string }> = ({
  message,
}) => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        bgcolor: "rgba(0,0,0,0.5)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999, // above other content
      }}
    >
      <CircularProgress size={35} thickness={5} />
      {message && (
        <Typography variant="h6" mt={2}>
          {message}
        </Typography>
      )}
    </Box>
  );
};
