import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addBookmark as addBookmarkApi,
  deleteBookmark as deleteBookmarkApi,
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

export function useUpdateBookmark() {
  const queryClient = useQueryClient();

  const { mutate: updateBookmark, isPending: isUpdatingBookmark } = useMutation(
    {
      mutationFn: updateBookmarkApi,
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
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
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
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
        queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
      },
    }
  );

  return { deleteBookmark, isDeletingBookmark };
}
