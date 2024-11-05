import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addNewLabel as addNewLabelApi } from "../../features/apiLabels";

export function useAddLabel() {
  const queryClient = useQueryClient();

  const { mutate: addNewLabel, isPending } = useMutation({
    mutationFn: addNewLabelApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["labels"] });
    },
  });

  return { addNewLabel, isPending };
}
