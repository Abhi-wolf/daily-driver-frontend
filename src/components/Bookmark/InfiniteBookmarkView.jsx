import { useEffect } from "react";
import { useGetInfiniteBookmarks } from "../../hooks/useBookmark";
import ErrorMessage from "../ErrorMessage";
import { MediumSpinner } from "../Spinners";
import BookmarkItem from "./BookmarkItem";
import { useInView } from "react-intersection-observer";
import { Loader2 } from "lucide-react";

function InfiniteBookmarkView() {
  const { data, isLoading, isFetchingNextPage, fetchNextPage, isError, error } =
    useGetInfiniteBookmarks();

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  if (isLoading) {
    return <MediumSpinner />;
  }

  if (isError) {
    return <ErrorMessage message={error?.message || "Something went wrong"} />;
  }

  return (
    <div className="w-full flex flex-col gap-6">
      {data?.pages?.map((page, index) => {
        if (!page?.length) return null;

        return (
          <div
            key={`page-${index}`}
            className="grid w-full gap-6 justify-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          >
            {page?.map((bookmark) => (
              <BookmarkItem key={bookmark._id} bookmark={bookmark} />
            ))}
          </div>
        );
      })}

      <div ref={ref} className="flex justify-center mt-3 mb-10 text-gray-400">
        {isFetchingNextPage && (
          <p className="flex gap-2">
            <Loader2 className="animate-spin" />
            Loading bookmarks ...
          </p>
        )}
      </div>
    </div>
  );
}

export default InfiniteBookmarkView;
