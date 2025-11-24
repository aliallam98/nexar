import {
  FirstPage,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  LastPage,
} from "@mui/icons-material";
import {
  Box,
  CircularProgress,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { ChangeEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import EmptyTablePlaceHolderMessage from "../common/EmptyTablePlaceHolderMessage";

interface Column<T> {
  id: string;
  label: string;
  render?: (row: T) => React.ReactNode;
  key?: string;
}

interface PaginatorInfo {
  currentPage: number;
  perPage: number;
  total: number;
  lastPage: number;
}

interface PaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    page: number
  ) => void;
}

interface IProps<T> {
  headingText: string;
  data: T[];
  columns: Column<T>[];
  //   paginatorInfo: PaginatorInfo;
  //   onPageChange: (newPage: number) => void;
  //   onRowsPerPageChange: (newRowsPerPage: number) => void;
  headingComponent?: React.ReactElement;
  loading?: boolean;
}

const ClientPaginatedTable = <T extends { id: string | number }>({
  headingText,
  data,
  //   onPageChange,
  columns,
  //   onRowsPerPageChange,
  headingComponent,
  loading,
}: IProps<T>) => {
  const { t } = useTranslation();

  const [paginatorInfo, setPaginatorInfo] = useState<PaginatorInfo>({
    currentPage: 1,
    perPage: 20,
    total: data?.length,
    lastPage: Math.ceil((data?.length || 0) / 20),
  });

  const handlePageChange = (newPage: number) => {
    setPaginatorInfo((prev) => ({
      ...prev,
      currentPage: newPage,
    }));
  };

  const handleRowsPerPageChange = (newPerPage: number) => {
    setPaginatorInfo((prev) => ({
      ...prev,
      perPage: newPerPage,
      currentPage: 1, // Reset to first page when changing page size
    }));
  };

  // Calculate paginated data
  const startIndex = (paginatorInfo.currentPage - 1) * paginatorInfo.perPage;
  const endIndex = startIndex + paginatorInfo.perPage;
  const currentPageData = data?.slice(startIndex, endIndex);

  return (
    <Paper
      sx={{
        borderRadius: 2,
        minHeight: 300,
        width: "100%",
        position: "relative",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Stack
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        px={2}
        py={1}
      >
        <Typography variant="h5">{t(headingText)}</Typography>
        {headingComponent && headingComponent}
      </Stack>
      <TableContainer>
        <Table>
          <TableHead sx={{ borderTop: "1px solid #48494a" }}>
            <TableRow>
              {columns?.map((col) => (
                <TableCell key={col.id as string}>{t(col.label)}</TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={columns?.length} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : currentPageData?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns?.length} align="center">
                  <EmptyTablePlaceHolderMessage />
                </TableCell>
              </TableRow>
            ) : (
              currentPageData?.map((row) => (
                <TableRow key={row.id}>
                  {columns?.map((col) => (
                    <TableCell key={col.id as string}>
                      {col.render
                        ? col.render(row)
                        : typeof row[col.id] === "object" && !!row[col.id]
                        ? (row[col.id] as any)?.[col.key!]
                        : (row[col.id] as React.ReactNode) ?? t("placeholder")}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {currentPageData?.length !== 0 && (
        <TablePagination
          rowsPerPageOptions={[10, 20, 25]}
          count={paginatorInfo.total || 0}
          rowsPerPage={paginatorInfo.perPage || 20}
          page={paginatorInfo.currentPage - 1}
          onPageChange={(_, newPage) => handlePageChange(newPage + 1)}
          onRowsPerPageChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleRowsPerPageChange(parseInt(e.target.value, 10))
          }
          labelRowsPerPage=""
          ActionsComponent={(props) => <CustomPaginationActions {...props} />}
          sx={{
            backgroundColor: "#2f3031",
            position: "sticky",
            bottom: 0,
            zIndex: 999,
          }}
          component="div"
        />
      )}
    </Paper>
  );
};

export default ClientPaginatedTable;

const CustomPaginationActions: React.FC<PaginationActionsProps> = ({
  count,
  page,
  rowsPerPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(count / rowsPerPage);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        position: "static",
        bottom: 0,
        borderRadius: 2,
      }}
    >
      <IconButton onClick={(e) => onPageChange(e, 0)} disabled={page === 0}>
        <FirstPage />
      </IconButton>
      <IconButton
        onClick={(e) => onPageChange(e, page - 1)}
        disabled={page === 0}
      >
        <KeyboardArrowLeft />
      </IconButton>

      <IconButton
        onClick={(e) => onPageChange(e, page + 1)}
        disabled={page >= totalPages - 1}
      >
        <KeyboardArrowRight />
      </IconButton>
      <IconButton
        onClick={(e) => onPageChange(e, totalPages - 1)}
        disabled={page >= totalPages - 1}
      >
        <LastPage />
      </IconButton>
    </Box>
  );
};
