import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateFileExplorer as updateFileExplorerApi } from "../../features/apiFileExplorer";

export function useUpdateFileExplorer() {
  const queryClient = useQueryClient();

  const { mutate: updateFileExplorer, isPending: isUpdating } = useMutation({
    mutationFn: updateFileExplorerApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fileExplorer"] });
    },
  });

  return { updateFileExplorer, isUpdating };
}
