/* eslint-disable react/prop-types */

import { useState } from "react";
import BookmarkPagination from "./BookmarkPagination";
import BookmarkGrid from "./BookmarkGrid";

export default function BookmarkView({ searchTerm }) {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <>
      <BookmarkGrid searchTerm={searchTerm} currentPage={currentPage} />

      <BookmarkPagination
        initialPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </>
  );
}
