"use client";

import * as React from "react";
import {
  Box,
  Paper,
  Collapse,
  Button,
  IconButton,
  Typography,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import TextInputComponent from "../components/form/TextInputComponent";
import DatePickerComponent from "../components/form/date-pickers/DatePickerComponent";
import { useForm } from "react-hook-form";

interface CategoryFilterFormData {
  searchTerm?: string;
  createdFrom?: Date | null;
  createdTo?: Date | null;
}

export function CategoryListFilter() {
  const [expanded, setExpanded] = React.useState(false);
  const { control, handleSubmit, reset } = useForm<CategoryFilterFormData>({
    defaultValues: {
      searchTerm: "",
      createdFrom: null,
      createdTo: null,
    },
  });

  const onSubmit = (data: CategoryFilterFormData) => {
    console.log("Filter data:", data);
    // TODO: Implement filter logic
  };

  const handleClear = () => {
    reset();
    // TODO: Clear applied filters
  };

  return (
    <Paper elevation={1} sx={{ mb: 3 }}>
      {/* Filter Header - Always Visible */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 2,
          cursor: "pointer",
        }}
        onClick={() => setExpanded(!expanded)}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <FilterListIcon color="action" />
          <Typography variant="h6" component="h2">
            Filters
          </Typography>
        </Box>
        <IconButton size="small">
          {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>

      {/* Filter Content - Collapsible */}
      <Collapse in={expanded}>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ p: 2, pt: 0, borderTop: 1, borderColor: "divider" }}
        >
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Box sx={{ flex: { xs: "1 1 100%", sm: "1 1 calc(50% - 8px)", md: "1 1 calc(33.333% - 11px)" } }}>
              <TextInputComponent
                name="searchTerm"
                label="Search Categories"
                placeholder="Search by name..."
                control={control}
              />
            </Box>
            <Box sx={{ flex: { xs: "1 1 100%", sm: "1 1 calc(50% - 8px)", md: "1 1 calc(33.333% - 11px)" } }}>
              <DatePickerComponent
                name="createdFrom"
                label="Created From"
                control={control}
              />
            </Box>
            <Box sx={{ flex: { xs: "1 1 100%", sm: "1 1 calc(50% - 8px)", md: "1 1 calc(33.333% - 11px)" } }}>
              <DatePickerComponent
                name="createdTo"
                label="Created To"
                control={control}
              />
            </Box>
          </Box>

          <Box
            sx={{ display: "flex", gap: 2, mt: 2, justifyContent: "flex-end" }}
          >
            <Button
              type="button"
              variant="outlined"
              color="secondary"
              onClick={handleClear}
            >
              Clear Filters
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Apply Filters
            </Button>
          </Box>
        </Box>
      </Collapse>
    </Paper>
  );
}
