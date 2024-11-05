import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSong as deleteSongApi } from "../../features/apiSongs";

export function useDeleteSong() {
  const queryClient = useQueryClient();

  const { mutate: deleteSong, isPending: isDeletingSong } = useMutation({
    mutationFn: deleteSongApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["songs"] });
    },
  });

  return { deleteSong, isDeletingSong };
}
