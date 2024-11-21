/* eslint-disable react/prop-types */

import { useState } from "react";

import { useEffect } from "react";
import BookmarkItem from "./BookmarkItem";
import { LargeSpinner } from "../Spinners";
import { useGetBookmarks } from "../../hooks/useBookmark";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import BookmarkPagination from "./BookmarkPagination";

export default function BookmarkView({ searchTerm }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const page = searchParams.get("page");
  const limit = searchParams.get("limit");

  const { data: bookmarks, isPending } = useGetBookmarks({ page, limit });

  const filteredBookmarks = bookmarks?.filter(
    (bookmark) =>
      bookmark.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bookmark.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bookmark?.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bookmark?.labels.some((label) =>
        label.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  useEffect(() => {
    navigate(`/bookmarks?page=${currentPage}&limit=9`);
  }, [currentPage]);

  if (isPending) {
    return <LargeSpinner />;
  }

  return (
    <>
      {filteredBookmarks?.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBookmarks?.map((bookmark) => (
            <BookmarkItem key={bookmark._id} bookmark={bookmark} />
          ))}
        </div>
      )}

      <BookmarkPagination
        initialPage={currentPage}
        onPageChange={setCurrentPage}
      />

      {filteredBookmarks?.length === 0 && (
        <div className="text-center py-12">
          <p className="text-2xl font-semibold text-gray-500">
            No bookmarks found
          </p>
          <p className="text-gray-400">
            Try adjusting your search or add a new bookmark
          </p>
        </div>
      )}
    </>
  );
}
