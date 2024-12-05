/* eslint-disable react/prop-types */
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetBookmarks } from "../../hooks/useBookmark";
import { useEffect } from "react";
import BookmarkItem from "./BookmarkItem";
import { LargeSpinner } from "../Spinners";

export default function BookmarkGrid({ searchTerm, currentPage = 1 }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page");
  const limit = searchParams.get("limit");

  const { data: bookmarks, isPending } = useGetBookmarks({ page, limit });

  const filteredBookmarks = bookmarks?.filter(
    (bookmark) =>
      bookmark.title.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      bookmark.url.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      bookmark?.category.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      bookmark?.labels.some((label) =>
        label.toLowerCase().includes(searchTerm?.toLowerCase())
      )
  );

  useEffect(() => {
    navigate(`/bookmarks?page=${currentPage}&limit=12`);
  }, [currentPage]);

  if (isPending) {
    return (
      <div className="w-full h-[80vh] ">
        <LargeSpinner />;
      </div>
    );
  }

  return (
    <div className="w-full h-[80vh] overflow-y-auto ">
      {filteredBookmarks?.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBookmarks?.map((bookmark) => (
            <BookmarkItem key={bookmark._id} bookmark={bookmark} />
          ))}
        </div>
      )}

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
    </div>
  );
}
