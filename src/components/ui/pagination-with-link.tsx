"use client";

import { type ReactNode, useCallback, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { cn } from "@/lib/utils";

export interface PaginationWithLinksProps {
  pageSizeSelectOptions?: {
    pageSizeSearchParam?: string;
    pageSizeOptions: number[];
  };
  totalCount: number;
  pageSize: number;
  page: number;
  pageSearchParam?: string;
  /**
   * Navigation mode: 'link' uses <Link>, 'router' uses navigate() with loading states
   * @default 'link'
   */
  navigationMode?: "link" | "router";
}

export function PaginationWithLinks({
  pageSizeSelectOptions,
  pageSize,
  totalCount,
  page,
  pageSearchParam,
  navigationMode = "router",
}: PaginationWithLinksProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isPending, setIsPending] = useState(false);

  const pathname = location.pathname;
  const searchParams = new URLSearchParams(location.search);
  const totalPageCount = Math.ceil(totalCount / pageSize);

  const buildLink = useCallback(
    (newPage: number) => {
      const key = pageSearchParam || "page";
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set(key, String(newPage));
      return `${pathname}?${newSearchParams.toString()}`;
    },
    [pageSearchParam, searchParams, pathname]
  );

  const navigateToPage = useCallback(
    async (newPage: number) => {
      if (navigationMode === "router") {
        const url = buildLink(newPage);
        setIsPending(true);
        navigate(url);
        // simulate small loading delay to trigger loader
        setTimeout(() => setIsPending(false), 300);
      }
    },
    [navigationMode, buildLink, navigate]
  );

  const navToPageSize = useCallback(
    (newPageSize: number) => {
      const key = pageSizeSelectOptions?.pageSizeSearchParam || "pageSize";
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set(key, String(newPageSize));
      newSearchParams.delete(pageSearchParam || "page"); // reset page
      const url = `${pathname}?${newSearchParams.toString()}`;

      if (navigationMode === "router") {
        setIsPending(true);
        navigate(url);
        setTimeout(() => setIsPending(false), 300);
      } else {
        navigate(url);
      }
    },
    [pageSearchParam, searchParams, pathname, navigationMode, navigate]
  );

  const renderPageNumbers = () => {
    const items: ReactNode[] = [];
    const maxVisiblePages = 5;

    const createPageItem = (pageNum: number) => {
      if (navigationMode === "router") {
        return (
          <PaginationItem key={pageNum}>
            <PaginationLink
              onClick={() => navigateToPage(pageNum)}
              isActive={page === pageNum}
              className={cn(
                "cursor-pointer",
                isPending && "pointer-events-none opacity-50"
              )}
              aria-disabled={isPending}
            >
              {pageNum}
            </PaginationLink>
          </PaginationItem>
        );
      } else {
        return (
          <PaginationItem key={pageNum}>
            <PaginationLink isActive={page === pageNum}>
              <Link to={buildLink(pageNum)}>{pageNum}</Link>
            </PaginationLink>
          </PaginationItem>
        );
      }
    };

    if (totalPageCount <= maxVisiblePages) {
      for (let i = 1; i <= totalPageCount; i++) {
        items.push(createPageItem(i));
      }
    } else {
      items.push(createPageItem(1));

      if (page > 3) {
        items.push(
          <PaginationItem key="ellipsis-start">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      const start = Math.max(2, page - 1);
      const end = Math.min(totalPageCount - 1, page + 1);

      for (let i = start; i <= end; i++) {
        items.push(createPageItem(i));
      }

      if (page < totalPageCount - 2) {
        items.push(
          <PaginationItem key="ellipsis-end">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      items.push(createPageItem(totalPageCount));
    }

    return items;
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-3 w-full">
      {pageSizeSelectOptions && (
        <div className="flex flex-col gap-4 flex-1">
          <SelectRowsPerPage
            options={pageSizeSelectOptions.pageSizeOptions}
            setPageSize={navToPageSize}
            pageSize={pageSize}
          />
        </div>
      )}
      <Pagination className={cn({ "md:justify-end": pageSizeSelectOptions })}>
        <PaginationContent className="max-sm:gap-0">
          <PaginationItem>
            {navigationMode === "router" ? (
              <PaginationPrevious
                onClick={() => navigateToPage(Math.max(page - 1, 1))}
                aria-disabled={page === 1 || isPending}
                tabIndex={page === 1 || isPending ? -1 : undefined}
                className={cn(
                  page === 1 || isPending
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                )}
              />
            ) : (
              <PaginationPrevious
                aria-disabled={page === 1}
                tabIndex={page === 1 ? -1 : undefined}
                className={
                  page === 1 ? "pointer-events-none opacity-50" : undefined
                }
              >
                <Link to={buildLink(Math.max(page - 1, 1))} />
              </PaginationPrevious>
            )}
          </PaginationItem>
          {renderPageNumbers()}
          <PaginationItem>
            {navigationMode === "router" ? (
              <PaginationNext
                onClick={() =>
                  navigateToPage(Math.min(page + 1, totalPageCount))
                }
                aria-disabled={page === totalPageCount || isPending}
                tabIndex={page === totalPageCount || isPending ? -1 : undefined}
                className={cn(
                  page === totalPageCount || isPending
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                )}
              />
            ) : (
              <PaginationNext
                aria-disabled={page === totalPageCount}
                tabIndex={page === totalPageCount ? -1 : undefined}
                className={
                  page === totalPageCount
                    ? "pointer-events-none opacity-50"
                    : undefined
                }
              >
                <Link to={buildLink(Math.min(page + 1, totalPageCount))} />
              </PaginationNext>
            )}
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

function SelectRowsPerPage({
  options,
  setPageSize,
  pageSize,
}: {
  options: number[];
  setPageSize: (newSize: number) => void;
  pageSize: number;
}) {
  return (
    <div className="flex items-center gap-4">
      <span className="whitespace-nowrap text-sm">Rows per page</span>

      <Select
        value={String(pageSize)}
        onValueChange={(value) => setPageSize(Number(value))}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select page size">
            {String(pageSize)}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={String(option)}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
