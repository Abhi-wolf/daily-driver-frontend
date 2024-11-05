import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTodo as createTodoApi } from "../../features/apiTodo";

export function useCreateTodo() {
  const queryClient = useQueryClient();

  const { mutate: createTodo, isPending: isCreatingTodo } = useMutation({
    mutationFn: createTodoApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  return { createTodo, isCreatingTodo };
}
