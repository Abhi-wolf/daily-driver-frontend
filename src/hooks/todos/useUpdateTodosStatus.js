import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTodoStatus as updateTodoStatusApi } from "../../features/apiTodo";

export function useUpdateTodosStatus() {
  const queryClient = useQueryClient();

  const { mutate: updateTodoStatus, isPending: isUpdatingTodoStatus } =
    useMutation({
      mutationFn: updateTodoStatusApi,
      onMutate: async (updatedTodo) => {
        // cancel any outgoing refetches
        await queryClient.cancelQueries({ queryKey: ["todos", "this-week"] });
        await queryClient.cancelQueries({ queryKey: ["todos", "today"] });

        // snapshot the previous value
        const previousTodaysTodos = queryClient.getQueryData([
          "todos",
          "today",
        ]);

        const previousThisWeeksTodos = queryClient.getQueryData([
          "todos",
          "this-week",
        ]);

        // optimistically update the cache with the new status
        queryClient.setQueryData(["todos", "today"], (oldTodos) =>
          oldTodos?.map((todo) =>
            todo._id === updatedTodo.todoId
              ? { ...todo, done: updatedTodo.done }
              : todo
          )
        );

        queryClient.setQueryData(["todos", "this-week"], (oldTodos) =>
          oldTodos?.map((todo) =>
            todo._id === updatedTodo.todoId
              ? { ...todo, done: updatedTodo.done }
              : todo
          )
        );

        return { previousTodaysTodos, previousThisWeeksTodos };
      },
      onError: (context) => {
        queryClient.setQueryData(
          ["todos", "today"],
          context.previousTodaysTodos
        );

        queryClient.setQueryData(
          ["todos", "this-week"],
          context.previousThisWeeksTodos
        );
      },
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ["todos"] });
      },
    });

  return { updateTodoStatus, isUpdatingTodoStatus };
}
