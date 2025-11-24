// FileManager/FileManagerHeader.tsx
import { Stack, InputAdornment } from "@mui/material";
import { Search } from "@mui/icons-material";
import { type Control } from "react-hook-form";
import TextInputComponent from "../form/TextInputComponent";
import { ViewDropdown } from "./ViewDropdown";
import { SortDropdown } from "./SortDropdown";
import { FileSizeDropdown } from "./FileSizeDropdown";

type ViewType = "grid" | "list";

interface FileManagerHeaderProps {
  control: Control<any>;
  viewType: ViewType;
  onViewChange: (view: ViewType) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  filterSize: string;
  onFilterSizeChange: (size: string) => void;
}

export const FileManagerHeader = ({
  control,
  viewType,
  onViewChange,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  filterSize,
  onFilterSizeChange,
}: FileManagerHeaderProps) => {
  return (
    <Stack direction="row" justifyContent="space-between" spacing={2}>
      <TextInputComponent
        label=""
        name="searchFile"
        control={control}
        variant="outlined"
        placeholder="Search files..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        sx={{ width: "60%" }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ mr: 1 }} />
              </InputAdornment>
            ),
          },
        }}
      />
      <Stack direction="row" gap={2}>
        <SortDropdown value={sortBy} onChange={onSortChange} />
        <ViewDropdown onViewChange={onViewChange} currentView={viewType} />
        <FileSizeDropdown value={filterSize} onChange={onFilterSizeChange} />
      </Stack>
    </Stack>
  );
};
