import { useState } from "react";
import { Menu, TextField, Box, Button } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

export function FileSizeDropdown() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [minSize, setMinSize] = useState("");
  const [maxSize, setMaxSize] = useState("");
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClear = () => {
    setMinSize("");
    setMaxSize("");
  };

  return (
    <>
      <Button
        variant="outlined"
        size="small"
        endIcon={<ArrowDropDownIcon />}
        onClick={handleClick}
        sx={{
          textTransform: "none",
          overflow: "hidden",
          height: 35,
          width: 50,
        }}
      >
        Size
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
      >
        <Box
          sx={{ display: "flex", flexDirection: "column", p: 1, width: 220 }}
        >
          <TextField
            label="Min size (MB)"
            variant="outlined"
            size="small"
            fullWidth
            margin="dense"
            value={minSize}
            onChange={(e) => setMinSize(e.target.value)}
          />
          <TextField
            label="Max size (MB)"
            variant="outlined"
            size="small"
            fullWidth
            margin="dense"
            value={maxSize}
            onChange={(e) => setMaxSize(e.target.value)}
          />
          <Button
            onClick={handleClear}
            fullWidth
            size="small"
            sx={{ mt: 1, textTransform: "none" }}
          >
            Clear
          </Button>
        </Box>
      </Menu>
    </>
  );
}
