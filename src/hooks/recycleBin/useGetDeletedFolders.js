import { useQuery } from "@tanstack/react-query";
import { getDeletedFolders } from "../../features/apiFolder";

export function useGetDeletedFolders() {
  const { data: deletedFolders, isPending } = useQuery({
    queryKey: ["deletedFolders"],
    queryFn: () => getDeletedFolders(),
  });

  return { deletedFolders, isPending };
}
