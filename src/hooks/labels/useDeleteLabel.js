import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteLabel as deleteLabelApi } from "../../features/apiLabels";

export function useDeleteLabel() {
  const queryClient = useQueryClient();

  const { mutate: deleteLabel, isPending: isDeletingLabel } = useMutation({
    mutationFn: deleteLabelApi,
    // onMutate: async (deletedLabel) => {
    //   await queryClient.cancelQueries({ queryKey: ["labels"] });

    //   const previousLabels = queryClient.getQueryData(["labels"]);

    //   queryClient.setQueryData(["labels"], (oldLabels) =>
    //     oldLabels.filter((label) => label._id !== deletedLabel.labelId)
    //   );

    //   return { previousLabels };
    // },
    // onError: (context) => {
    //   queryClient.setQueryData(["labels"], context.previousLabels);
    // },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["labels"] });
    },
  });

  return { deleteLabel, isDeletingLabel };
}
