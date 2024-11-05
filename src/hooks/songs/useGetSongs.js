import { useQuery } from "@tanstack/react-query";
import { getSongs } from "../../features/apiSongs";

export function useGetSongs() {
  const {
    data: songs,
    error,
    isPending,
  } = useQuery({
    queryKey: ["songs"],
    queryFn: () => getSongs(),
  });

  return { songs, isPending, error };
}
