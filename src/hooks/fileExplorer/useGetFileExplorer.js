import { useQuery } from "@tanstack/react-query";
import { getFolders } from "../../features/apiFolder";

export function useGetUserFileExplorer() {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["fileExplorer"],
    queryFn: () => getFolders(),
  });

  return { data, isPending, isError, error };
}
