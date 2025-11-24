"use client";

import { cn } from "../../lib/utils";
import { MoveLeft, MoveRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";

/**
 * paginatorInfo Interface
 *
 * Metadata describing the pagination state.
 */
export interface paginatorInfo {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

/**
 * Pagination Component
 *
 * A flexible pagination component that allows navigation through pages,
 * showing a dynamic list of page numbers with previous/next buttons.
 *
 * @param paginatorInfo - Object containing pagination metadata.
 * @param buttonClassName - Optional CSS class for the pagination buttons (previous/next).
 * @param activePageClassName - Optional CSS class for the active page number button.
 * @param containerClassName - Optional CSS class for the container wrapping the pagination buttons.
 */

interface IProps {
  paginatorInfo: paginatorInfo;
  buttonClassName?: string;
  activePageClassName?: string;
  containerClassName?: string;
}

/**
 * Pagination component for displaying and navigating through a set of pages.
 * Displays previous and next buttons along with a list of page numbers.
 */
const Pagination = ({
  paginatorInfo,
  buttonClassName,
  activePageClassName,
  containerClassName,
}: IProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get the current page from the searchParams, falling back to the passed 'page' prop.
  const currentPage = paginatorInfo.currentPage || 1;

  /**
   * Navigates to a specific page.
   * Updates the page query parameter in the URL and triggers a re-render.
   *
   * @param pageValue - The page number to navigate to.
   */
  const navigateToPage = (pageValue: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageValue.toString());
    router.push(`?${params.toString()}`);
  };

  /**
   * Handles click events for the previous and next buttons.
   * Moves to the previous or next page if the action is within valid bounds.
   *
   * @param value - The direction to navigate, either "prev" or "next".
   */
  const onClickHandler = (value: "prev" | "next") => {
    const pageValue = value === "prev" ? currentPage - 1 : currentPage + 1;
    if (pageValue >= 1 && pageValue <= paginatorInfo.totalPages) {
      navigateToPage(pageValue);
    }
  };

  /**
   * Generates the page numbers to display based on the current page and total pages.
   * It calculates the page numbers with a range around the current page and includes "..." for skipped ranges.
   *
   * @param currentPage - The current active page number.
   * @param totalPages - The total number of pages available.
   * @param range - The range of pages to show around the current page (default is 1).
   *
   * @returns An array of page numbers and/or ellipsis.
   */
  const getPageNumbers = (
    currentPage: number,
    totalPages: number,
    range = 1
  ) => {
    const pages: (number | string)[] = [];
    for (let i = 1; i <= totalPages; i++) {
      // Show first and last pages, and pages within the range around the current page
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - range && i <= currentPage + range)
      ) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== "...") {
        pages.push("...");
      }
    }
    return pages;
  };

  return (
    <div
      className={cn(
        "flex justify-center items-center gap-x-10 mt-10",
        containerClassName
      )}
    >
      {/* Previous button */}
      <Button
        className={cn("rounded-full", buttonClassName)}
        variant="outline"
        size="sm"
        onClick={() => onClickHandler("prev")}
        disabled={!paginatorInfo.hasPreviousPage}
      >
        <MoveLeft aria-hidden="true" />
      </Button>

      {/* Page numbers */}
      <div className="flex gap-2">
        {getPageNumbers(currentPage, paginatorInfo.totalPages).map(
          (pageNumber, i) =>
            pageNumber === "..." ? (
              <span key={i}>...</span> // Display ellipsis when there are skipped page ranges
            ) : (
              <span
                key={i}
                onClick={() =>
                  typeof pageNumber === "number" && navigateToPage(pageNumber)
                } // Navigate to selected page
                className={cn(
                  "size-10 border-2 border-[#e5e3da] flex justify-center items-center rounded-full cursor-pointer",
                  currentPage === pageNumber && activePageClassName // Highlight active page number
                )}
              >
                {pageNumber}
              </span>
            )
        )}
      </div>

      {/* Next button */}
      <Button
        className={cn("rounded-full", buttonClassName)}
        variant="outline"
        size="sm"
        onClick={() => onClickHandler("next")}
        disabled={!paginatorInfo.hasNextPage}
      >
        <MoveRight aria-hidden="true" />
      </Button>
    </div>
  );
};

export default Pagination;
