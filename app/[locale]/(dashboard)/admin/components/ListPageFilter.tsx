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

interface ListPageFilterProps {
  filterComponents: React.ReactNode[];
  onSubmit: (e?: React.BaseSyntheticEvent) => void;
  onClear: () => void;
  defaultExpanded?: boolean;
}

export function ListPageFilter({
  filterComponents,
  onSubmit,
  onClear,
  defaultExpanded = false,
}: ListPageFilterProps) {
  const [expanded, setExpanded] = React.useState(defaultExpanded);

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
          onSubmit={onSubmit}
          sx={{ p: 2, pt: 0, borderTop: 1, borderColor: "divider" }}
        >
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            {filterComponents.map((component, index) => (
              <Box
                key={index}
                sx={{
                  flex: {
                    xs: "1 1 100%",
                    sm: "1 1 calc(50% - 8px)",
                    md: "1 1 calc(33.333% - 11px)",
                  },
                }}
              >
                {component}
              </Box>
            ))}
          </Box>

          <Box
            sx={{ display: "flex", gap: 2, mt: 2, justifyContent: "flex-end" }}
          >
            <Button
              type="button"
              variant="outlined"
              color="secondary"
              onClick={onClear}
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
