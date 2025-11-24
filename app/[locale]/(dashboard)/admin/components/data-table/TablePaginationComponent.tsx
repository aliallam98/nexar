"use client";

import {
  FirstPage,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  LastPage,
} from "@mui/icons-material";
import {
  IconButton,
  Stack,
  TablePagination,
  type TablePaginationProps,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useCallback } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import type { PaginationDetails } from "../../graphql/types";

type Props = {
  paginatorInfo: PaginationDetails;
  /** If provided, the component will control pagination locally instead of URL params */
  setClientPaginatorInfo?: (info: PaginationDetails) => void;
  clientPaginatorInfo?: PaginationDetails;
  rowsPerPageOptions?: number[];
  showFirstLastButtons?: boolean;
  /** Extra sx you might want to pass down */
  sx?: TablePaginationProps["sx"];
};

const PREFIX = "Paginator";
const classes = {
  icon: `${PREFIX}-icon`,
  iconRtl: `${PREFIX}-icon-rtl`,
};

const Root = styled(Stack)(() => ({
  [`& .${classes.iconRtl}`]: {
    transform: `rotate(180deg)`,
  },
  [`& .${classes.icon}`]: {
    transform: `rotate(0deg)`,
  },
}));

export const TablePaginationComponent = ({
  paginatorInfo,
  setClientPaginatorInfo,
  clientPaginatorInfo,
  rowsPerPageOptions = [20, 50, 100],
  showFirstLastButtons = true,
}: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { i18n } = useTranslation();

  const page = (paginatorInfo?.currentPage || 1) - 1; // MUI is 0-based
  const rowsPerPage = paginatorInfo?.itemsPerPage || 20;

  const updateSearchParams = useCallback(
    (newPage: number, newRowsPerPage: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", String(newPage + 1));
      params.set("rowsPerPage", String(newRowsPerPage));
      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams]
  );

  const updateClientState = useCallback(
    (newPage: number, newRowsPerPage: number) => {
      if (setClientPaginatorInfo && clientPaginatorInfo) {
        const updatedInfo: PaginationDetails = {
          ...clientPaginatorInfo,
          currentPage: newPage + 1,
          itemsPerPage: newRowsPerPage,
          total: paginatorInfo.total,
        };
        setClientPaginatorInfo(updatedInfo);
      }
    },
    [setClientPaginatorInfo, clientPaginatorInfo, paginatorInfo.total]
  );

  const handlePageChange = useCallback(
    (_event: unknown, newPage: number) => {
      if (clientPaginatorInfo && setClientPaginatorInfo) {
        updateClientState(newPage, rowsPerPage);
      } else {
        updateSearchParams(newPage, rowsPerPage);
      }
    },
    [
      clientPaginatorInfo,
      setClientPaginatorInfo,
      rowsPerPage,
      updateSearchParams,
      updateClientState,
    ]
  );

  const handleRowsPerPageChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newRows = parseInt(event.target.value, 10);
      if (clientPaginatorInfo && setClientPaginatorInfo) {
        updateClientState(0, newRows);
      } else {
        updateSearchParams(0, newRows);
      }
    },
    [
      clientPaginatorInfo,
      setClientPaginatorInfo,
      updateSearchParams,
      updateClientState,
    ]
  );

  return (
    <TablePagination
      labelRowsPerPage=""
      component="div"
      count={paginatorInfo?.total || 0}
      page={page}
      rowsPerPage={rowsPerPage}
      rowsPerPageOptions={rowsPerPageOptions}
      onPageChange={handlePageChange}
      onRowsPerPageChange={handleRowsPerPageChange}
      ActionsComponent={(props) => (
        <PaginationActions
          {...props}
          showFirstLastButtons={showFirstLastButtons}
        />
      )}
      labelDisplayedRows={
        i18n.language === "en"
          ? undefined
          : ({ from, to, count }) =>
              `${from}-${to} من ${count !== -1 ? count : `أكثر من ${to}`}`
      }
      sx={[
        (theme) => ({
          backgroundColor: theme.palette.background.paper,
          borderRadius: "0 0 16px 16px",
          minHeight: 40,
          ".MuiTablePagination-toolbar": {
            minHeight: 40,
            height: 40,
            py: 0,
          },
          ".MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows, .MuiSelect-select":
            {
              fontSize: "0.75rem",
            },
          overflowY: "hidden",
        }),
      ]}
    />
  );
};

type ActionsProps = {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    page: number
  ) => void;
  showFirstLastButtons?: boolean;
};

const PaginationActions = ({
  count,
  page,
  rowsPerPage,
  onPageChange,
  showFirstLastButtons = true,
}: ActionsProps) => {
  const lastPageIndex = Math.max(0, Math.ceil(count / rowsPerPage) - 1);
  const { i18n } = useTranslation();
  const isRtl = i18n.dir() === "rtl";

  return (
    <Root direction="row" spacing={0.2} alignItems="center">
      {showFirstLastButtons && (
        <IconButton
          onClick={(e) => onPageChange(e, 0)}
          disabled={page === 0}
          aria-label="first page"
          size="small"
        >
          <FirstPage className={isRtl ? classes.iconRtl : classes.icon} />
        </IconButton>
      )}

      <IconButton
        onClick={(e) => onPageChange(e, page - 1)}
        disabled={page === 0}
        aria-label="previous page"
        size="small"
      >
        <KeyboardArrowLeft className={isRtl ? classes.iconRtl : classes.icon} />
      </IconButton>

      <IconButton
        onClick={(e) => onPageChange(e, page + 1)}
        disabled={page >= lastPageIndex}
        aria-label="next page"
        size="small"
      >
        <KeyboardArrowRight
          className={isRtl ? classes.iconRtl : classes.icon}
        />
      </IconButton>

      {showFirstLastButtons && (
        <IconButton
          onClick={(e) => onPageChange(e, lastPageIndex)}
          disabled={page >= lastPageIndex}
          aria-label="last page"
          size="small"
        >
          <LastPage className={isRtl ? classes.iconRtl : classes.icon} />
        </IconButton>
      )}
    </Root>
  );
};

export default TablePaginationComponent;
