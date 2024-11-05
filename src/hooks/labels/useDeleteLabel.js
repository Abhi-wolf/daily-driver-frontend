import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteLabel as deleteLabelApi } from "../../features/apiLabels";

export function useDeleteLabel() {
  const queryClient = useQueryClient();

  const { mutate: deleteLabel, isPending: isDeletingLabel } = useMutation({
    mutationFn: deleteLabelApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["labels"]);
    },
  });

  return { deleteLabel, isDeletingLabel };
}
