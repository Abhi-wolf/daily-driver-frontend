import { useQuery } from "@tanstack/react-query";
import { getUserTodos } from "../../features/apiTodo";

export function useGetTodos(filter) {
  const { data: todos, isPending: isGettingTodos } = useQuery({
    queryKey: ["todos", filter],
    queryFn: () => getUserTodos(filter),
    enabled: !!filter,
  });

  return { todos, isGettingTodos };
}
