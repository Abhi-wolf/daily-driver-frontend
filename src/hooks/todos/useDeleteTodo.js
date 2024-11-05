import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTodo as deleteTodoApi } from "../../features/apiTodo";

export function useDeleteTodo() {
  const queryClient = useQueryClient();

  const { mutate: deleteTodo, isPending: isDeletingTodo } = useMutation({
    mutationFn: deleteTodoApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  return { deleteTodo, isDeletingTodo };
}
