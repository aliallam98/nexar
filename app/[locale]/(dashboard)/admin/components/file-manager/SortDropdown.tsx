import { ArrowDropDown } from "@mui/icons-material";
import {
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Menu,
  Box,
} from "@mui/material";
import { useState } from "react";

const sortOptions = [
  { value: "date_newest", label: "Date added (newest first)" },
  { value: "date_oldest", label: "Date added (oldest first)" },
  { value: "name_asc", label: "File name (A-Z)" },
  { value: "name_desc", label: "File name (Z-A)" },
  { value: "size_smallest", label: "File size (smallest first)" },
  { value: "size_largest", label: "File size (largest first)" },
];

interface SortDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

export function SortDropdown({ value, onChange }: SortDropdownProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        variant="outlined"
        size="small"
        endIcon={<ArrowDropDown />}
        onClick={handleClick}
        sx={{
          textTransform: "none",
          maxWidth: 50,
          overflow: "hidden",
          height: 35,
          width: 50,
        }}
      >
        Sort
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
      >
        <Box sx={{ p: 1 }}>
          <RadioGroup value={value} onChange={(e) => onChange(e.target.value)}>
            {sortOptions.map((option) => (
              <FormControlLabel
                key={option.value}
                value={option.value}
                control={<Radio size="small" />}
                label={option.label}
              />
            ))}
          </RadioGroup>
        </Box>
      </Menu>
    </>
  );
}
