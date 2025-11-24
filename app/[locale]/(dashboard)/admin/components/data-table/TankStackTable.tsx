"use client";
import {
  Box,
  CircularProgress,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  type Row,
  useReactTable,
  type OnChangeFn,
  type RowSelectionState,
} from "@tanstack/react-table";
import { type ReactNode, useMemo, useCallback } from "react";
import { IndeterminateCheckbox } from "./IndeterminateCheckbox";
import { TablePaginationComponent } from "./TablePaginationComponent";
import { styled } from "@mui/material/styles";
import { FolderOffOutlined, InboxOutlined } from "@mui/icons-material";
// import type { PaginationDetails } from "../../graphql/types";

export interface PaginationState {
  page: number;
  rowsPerPage: number;
}

interface TableProps<T> {
  columns: ColumnDef<T, any>[];
  data: T[];
  loading?: boolean;

  // Pagination props
  paginatorInfo?: any; //PaginationDetails;
  hidePagination?: boolean;
  useUrlPagination?: boolean;
  onPaginationChange?: (state: PaginationState) => void;

  // Selection props
  showCheckbox?: boolean;
  onRowSelectionChange?: OnChangeFn<RowSelectionState>;
  rowSelection?: RowSelectionState;
  getRowId?: (row: T) => string;

  // UI props
  headerComponent?: ReactNode;
  stickyFirstCol?: boolean;
  stickyLastCol?: boolean;
  maxCellWidth?: number;

  // Features
  sumValues?: Record<string, any> | null;
  compareRows?: boolean;
  highlightColor?: string;

  // Deprecated - kept for backwards compatibility
  storageKey?: string;
}

// Styled Components
const PREFIX = "OptimizedTableCell";

const classes = {
  cellWidth: `${PREFIX}-cellWidth`,
  cellWidthAuto: `${PREFIX}-cellWidthAuto`,
};

const StyledTableCell = styled(TableCell)<{ maxWidth?: number }>(
  ({ maxWidth = 200 }) => ({
    [`& .${classes.cellWidth}`]: {
      whiteSpace: "normal",
      maxWidth: `${maxWidth}px`,
      inlineSize: "max-content",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    [`& .${classes.cellWidthAuto}`]: {
      whiteSpace: "normal",
      inlineSize: "max-content",
    },
  })
);

const StyledPaper = styled(Paper)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  width: "100%",
  overflow: "hidden",
  borderRadius: 0,
  backgroundColor: theme.palette.background.paper,
}));

const ScrollableBox = styled(Box)({
  flex: 1,
  overflowY: "auto",
  position: "relative",
});

const StickyPaginationBox = styled(Box)(({ theme }) => ({
  position: "sticky",
  bottom: 0,
  zIndex: 1,
  backgroundColor: theme.palette.background.paper,
  borderTop: `1px solid ${theme.palette.divider}`,
}));

// Utility Functions
const normalize = (val: any): any => {
  if (val instanceof Date) return val.getTime();
  if (typeof val === "string") {
    const date = new Date(val);
    if (!isNaN(date.getTime())) {
      return date.getTime();
    }
  }
  return val;
};

// Custom Hooks

// Sub-components
const TableLoading = () => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
      width: "100%",
      backgroundColor: "background.paper",
    }}
  >
    <CircularProgress size={32} />
  </Box>
);
const EmptyState = ({ message }: { message?: string }) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      height: "100%",
    }}
  >
    <Stack spacing={2} alignItems="center">
      <FolderOffOutlined
        sx={{
          fontSize: 48,
          color: "text.disabled",
          opacity: 0.5,
        }}
      />
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ textAlign: "center" }}
      >
        {message || "No data available"}
      </Typography>
    </Stack>
  </Box>
);
const SumRow = ({
  table,
  sumValues,
  stickyFirstCol,
  stickyLastCol,
}: {
  table: any;
  sumValues: Record<string, any>;
  stickyFirstCol: boolean;
  stickyLastCol: boolean;
}) => {
  const headers = table.getFlatHeaders();

  return (
    <TableRow>
      {headers.map((header: any, index: number) => {
        const colId = header.column.id;
        const value = sumValues[colId];
        const isFirst = index === 0;
        const isLast = index === headers.length - 1;

        return (
          <TableCell
            key={`sum-${colId}`}
            sx={{
              fontWeight: "bold",
              backgroundColor: "background.paper",
              ...(isFirst &&
                stickyFirstCol && {
                  position: "sticky",
                  left: 0,
                  zIndex: 1,
                }),
              ...(isLast &&
                stickyLastCol && {
                  position: "sticky",
                  right: 0,
                  zIndex: 1,
                }),
            }}
          >
            {value ? Number(value).toLocaleString() : ""}
          </TableCell>
        );
      })}
    </TableRow>
  );
};

const TableHeader = ({
  table,
  stickyFirstCol,
  stickyLastCol,
}: {
  table: any;
  stickyFirstCol: boolean;
  stickyLastCol: boolean;
}) => (
  <TableHead>
    {table.getHeaderGroups().map((headerGroup: any) => (
      <TableRow key={headerGroup.id}>
        {headerGroup.headers.map((header: any, i: number, all: any[]) => {
          const isFirst = i === 0;
          const isLast = i === all.length - 1;

          return (
            <TableCell
              key={header.id}
              colSpan={header.colSpan}
              sx={{
                textTransform: "capitalize",
                fontWeight: "bold",
                ...(isFirst &&
                  stickyFirstCol && {
                    position: "sticky",
                    left: 0,
                    zIndex: 999,
                    backgroundColor: "background.paper",
                  }),
                ...(isLast &&
                  stickyLastCol && {
                    position: "sticky",
                    right: 0,
                    zIndex: 999,
                    backgroundColor: "background.paper",
                  }),
                ...(!isFirst &&
                  !isLast && {
                    backgroundColor: "background.paper",
                  }),
              }}
            >
              {!header.isPlaceholder &&
                flexRender(header.column.columnDef.header, header.getContext())}
            </TableCell>
          );
        })}
      </TableRow>
    ))}
  </TableHead>
);

// Main Component
const TankStackTable = <T,>({
  columns,
  data,
  loading = false,
  paginatorInfo,
  hidePagination = false,
  useUrlPagination = true,
  onPaginationChange,
  showCheckbox = false,
  onRowSelectionChange,
  rowSelection = {},
  getRowId,
  headerComponent: HeaderComponent,
  sumValues,
  stickyFirstCol = false,
  stickyLastCol = false,
  maxCellWidth = 200,
  compareRows = false,
  highlightColor = "#959595",
}: TableProps<T>) => {
  // Memoize checkbox column to prevent unnecessary re-renders
  const checkboxColumn = useMemo(
    () => ({
      id: "select",
      header: ({ table }: { table: any }) => (
        <IndeterminateCheckbox
          checked={table.getIsAllRowsSelected()}
          indeterminate={table.getIsSomeRowsSelected()}
          onChange={table.getToggleAllRowsSelectedHandler()}
        />
      ),
      cell: ({ row }: { row: Row<T> }) => (
        <IndeterminateCheckbox
          checked={row.getIsSelected()}
          disabled={!row.getCanSelect()}
          indeterminate={row.getIsSomeSelected()}
          onChange={row.getToggleSelectedHandler()}
        />
      ),
    }),
    []
  );

  // Memoize extended columns
  const extendedColumns = useMemo(
    () => (showCheckbox ? [checkboxColumn, ...columns] : columns),
    [showCheckbox, checkboxColumn, columns]
  );

  // Memoize table instance
  const table = useReactTable({
    columns: extendedColumns,
    data: data || [],
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: paginatorInfo?.lastPage,
    getRowId,
    state: { rowSelection },
    onRowSelectionChange,
    meta: {
      totalRows: data?.length || 0,
      lastIndex: (data?.length || 1) - 1,
    },
  });

  // Memoize row data for comparison
  const rowsWithComparison = useMemo(() => {
    const rows = table.getRowModel().rows;

    if (!compareRows) return rows;

    return rows.map((row, index) => ({
      ...row,
      comparisonData: index > 0 ? rows[index - 1] : null,
    }));
  }, [table.getRowModel().rows, compareRows]);

  // Memoize comparison results to avoid calling hook in callback
  const comparisonResults = useMemo(() => {
    if (!compareRows) return new Map();

    const results = new Map<string, boolean>();

    rowsWithComparison.forEach((row: any, rowIndex: number) => {
      if (rowIndex === 0) return;

      row.getVisibleCells().forEach((cell: any, colIndex: number) => {
        const currentValue = cell.getValue();
        const previousValue = row.comparisonData
          ?.getVisibleCells()
          // eslint-disable-next-line no-unexpected-multiline
          [colIndex]?.getValue();

        const shouldHighlight =
          normalize(currentValue) !== normalize(previousValue);
        results.set(`${row.id}-${cell.id}`, shouldHighlight);
      });
    });

    return results;
  }, [rowsWithComparison, compareRows]);

  // Enhanced pagination component with state management
  const PaginationComponent = useCallback(() => {
    if (!paginatorInfo) return null;

    return (
      <TablePaginationComponent
        paginatorInfo={paginatorInfo}
        useUrlPagination={useUrlPagination}
        onPaginationChange={onPaginationChange}
      />
    );
  }, [paginatorInfo, useUrlPagination, onPaginationChange]);

  // Early returns
  if (loading) return <TableLoading />;
  if (!data || data.length === 0) return <EmptyState />;

  return (
    <StyledPaper>
      {HeaderComponent && (
        <Box py={2} px={4}>
          {HeaderComponent}
        </Box>
      )}

      <ScrollableBox>
        <Table stickyHeader size="small">
          <TableHeader
            table={table}
            stickyFirstCol={stickyFirstCol}
            stickyLastCol={stickyLastCol}
          />

          <TableBody>
            {rowsWithComparison.map((row: any, rowIndex: number) => (
              <TableRow key={row.id} hover>
                {row
                  .getVisibleCells()
                  .map((cell: any, colIndex: number, allCells: any[]) => {
                    const isFirst = colIndex === 0;
                    const isLast = colIndex === allCells.length - 1;

                    const shouldHighlight =
                      compareRows && rowIndex > 0
                        ? comparisonResults.get(`${row.id}-${cell.id}`) || false
                        : false;

                    return (
                      <StyledTableCell
                        key={cell.id}
                        maxWidth={maxCellWidth}
                        sx={{
                          ...(isFirst &&
                            stickyFirstCol && {
                              position: "sticky",
                              left: 0,
                              zIndex: 1,
                              backgroundColor: "background.paper",
                            }),
                          ...(isLast &&
                            stickyLastCol && {
                              position: "sticky",
                              right: 0,
                              zIndex: 1,
                              backgroundColor: "background.paper",
                            }),
                          ...(shouldHighlight && {
                            backgroundColor: highlightColor,
                          }),
                        }}
                      >
                        <div className={classes.cellWidth}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </div>
                      </StyledTableCell>
                    );
                  })}
              </TableRow>
            ))}

            {sumValues && (
              <SumRow
                table={table}
                sumValues={sumValues}
                stickyFirstCol={stickyFirstCol}
                stickyLastCol={stickyLastCol}
              />
            )}
          </TableBody>
        </Table>
      </ScrollableBox>

      {!hidePagination && data.length > 0 && paginatorInfo && (
        <StickyPaginationBox>
          <PaginationComponent />
        </StickyPaginationBox>
      )}
    </StyledPaper>
  );
};

export default TankStackTable;
