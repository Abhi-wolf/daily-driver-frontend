import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTodo as deleteTodoApi } from "../../features/apiTodo";

export function useDeleteTodo() {
  const queryClient = useQueryClient();

  const { mutate: deleteTodo, isPending: isDeletingTodo } = useMutation({
    mutationFn: deleteTodoApi,
    // onMutate: async (deletedTodo) => {
    //   console.log(deletedTodo);

    //   // cancel any outgoing refetches
    //   await queryClient.cancelQueries({ queryKey: ["todos", "this-week"] });
    //   await queryClient.cancelQueries({ queryKey: ["todos", "today"] });

    //   // snapshot the previous value
    //   const previousTodaysTodos = queryClient.getQueryData(["todos", "today"]);

    //   const previousThisWeeksTodos = queryClient.getQueryData([
    //     "todos",
    //     "this-week",
    //   ]);

    //   // optimistically update the cache with the new status
    //   queryClient.setQueryData(["todos", "today"], (oldTodos) =>
    //     oldTodos
    //       ? oldTodos?.filter((todo) => todo._id !== deletedTodo.todoId)
    //       : []
    //   );

    //   queryClient.setQueryData(["todos", "this-week"], (oldTodos) =>
    //     oldTodos
    //       ? oldTodos?.filter((todo) => todo._id !== deletedTodo.todoId)
    //       : []
    //   );

    //   return { previousTodaysTodos, previousThisWeeksTodos };
    // },
    // onError: (context) => {
    //   queryClient.setQueryData(["todos", "today"], context.previousTodaysTodos);

    //   queryClient.setQueryData(
    //     ["todos", "this-week"],
    //     context.previousThisWeeksTodos
    //   );
    // },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  return { deleteTodo, isDeletingTodo };
}
