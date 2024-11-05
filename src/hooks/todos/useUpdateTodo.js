import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTodo as updateTodoApi } from "../../features/apiTodo";

export function useUpdateTodo() {
  const queryClient = useQueryClient();

  const { mutate: updateTodo, isPending: isUpdatingTodo } = useMutation({
    mutationFn: updateTodoApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  return { updateTodo, isUpdatingTodo };
}
