import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadSong as uploadSongApi } from "../../features/apiSongs";

export function useUploadSong() {
  const queryClient = useQueryClient();

  const { mutate: uploadSong, isPending: isUploadingSong } = useMutation({
    mutationFn: uploadSongApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["songs"] });
    },
  });

  return { uploadSong, isUploadingSong };
}
