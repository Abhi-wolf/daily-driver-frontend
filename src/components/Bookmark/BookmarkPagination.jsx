/* eslint-disable react/prop-types */
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { memo, useState } from "react";

function BookmarkPagination({ initialPage = 1, onPageChange }) {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      onPageChange(newPage);
    }
  };

  const handleNextPage = () => {
    const newPage = currentPage + 1;
    setCurrentPage(newPage);
    onPageChange(newPage);
  };

  return (
    <div className="fixed bottom-14 left-0 right-0 flex justify-center ">
      <div className="rounded-lg p-1 md:p-2 shadow-lg backdrop-blur bg-gray-200">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={handlePreviousPage}
                className={`transition-colors duration-200 bg-gray-300 cursor-default ${
                  currentPage === 1
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-accent hover:text-accent-foreground"
                }`}
                aria-disabled={currentPage === 1}
              />
            </PaginationItem>
            {currentPage > 3 && (
              <PaginationItem>
                <PaginationLink
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(1);
                    onPageChange?.(1);
                  }}
                >
                  1
                </PaginationLink>
              </PaginationItem>
            )}
            {currentPage > 4 && <PaginationEllipsis />}
            {currentPage > 2 && (
              <PaginationItem>
                <PaginationLink
                  onClick={(e) => {
                    e.preventDefault();
                    const newPage = currentPage - 2;
                    setCurrentPage(newPage);
                    onPageChange?.(newPage);
                  }}
                >
                  {currentPage - 2}
                </PaginationLink>
              </PaginationItem>
            )}
            {currentPage > 1 && (
              <PaginationItem>
                <PaginationLink
                  onClick={(e) => {
                    e.preventDefault();
                    const newPage = currentPage - 1;
                    setCurrentPage(newPage);
                    onPageChange?.(newPage);
                  }}
                >
                  {currentPage - 1}
                </PaginationLink>
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationLink isActive>{currentPage}</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                onClick={(e) => {
                  e.preventDefault();
                  const newPage = currentPage + 1;
                  setCurrentPage(newPage);
                  onPageChange?.(newPage);
                }}
              >
                {currentPage + 1}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                onClick={(e) => {
                  e.preventDefault();
                  const newPage = currentPage + 2;
                  setCurrentPage(newPage);
                  onPageChange?.(newPage);
                }}
              >
                {currentPage + 2}
              </PaginationLink>
            </PaginationItem>
            <PaginationEllipsis />
            <PaginationItem>
              <PaginationNext
                onClick={handleNextPage}
                className="transition-colors duration-200 hover:bg-accent hover:text-accent-foreground bg-gray-300 cursor-default"
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}

export default memo(BookmarkPagination);
