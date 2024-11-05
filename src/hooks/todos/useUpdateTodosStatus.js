import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTodoStatus as updateTodoStatusApi } from "../../features/apiTodo";

export function useUpdateTodosStatus() {
  const queryClient = useQueryClient();

  const { mutate: updateTodoStatus, isPending: isUpdatingTodoStatus } =
    useMutation({
      mutationFn: updateTodoStatusApi,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["todos"] });
      },
    });

  return { updateTodoStatus, isUpdatingTodoStatus };
}
