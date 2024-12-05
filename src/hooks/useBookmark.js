import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  addBookmark as addBookmarkApi,
  deleteBookmark as deleteBookmarkApi,
  getUserBookmark,
  getUserBookmarks,
  updateBookmark as updateBookmarkApi,
} from "../features/apiBookmark";

export function useGetBookmarks({ page, limit }) {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["bookmarks", page],
    queryFn: () => getUserBookmarks({ page, limit }),
    enabled: !!page,
  });

  return { data, isPending, isError, error };
}

export function useGetInfiniteBookmarks() {
  const {
    data,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isError,
    error,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["bookmark"],
    queryFn: getUserBookmark,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage?.length > 0) {
        return allPages.length + 1;
      } else {
        return undefined;
      }
    },
  });

  return {
    data,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isError,
    error,
    isFetchingNextPage,
  };
}

export function useUpdateBookmark() {
  const queryClient = useQueryClient();

  const { mutate: updateBookmark, isPending: isUpdatingBookmark } = useMutation(
    {
      mutationFn: updateBookmarkApi,
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ["bookmark"] });
      },
    }
  );

  return { updateBookmark, isUpdatingBookmark };
}

export function useAddBookmark() {
  const queryClient = useQueryClient();

  const {
    mutate: addBookmark,
    isPending: isAddingBookmark,
    error,
  } = useMutation({
    mutationFn: addBookmarkApi,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["bookmark"] });
    },
  });

  return { addBookmark, isAddingBookmark, error };
}

export function useDeleteBookmark() {
  const queryClient = useQueryClient();

  const { mutate: deleteBookmark, isPending: isDeletingBookmark } = useMutation(
    {
      mutationFn: deleteBookmarkApi,
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ["bookmark"] });
      },
    }
  );

  return { deleteBookmark, isDeletingBookmark };
}
