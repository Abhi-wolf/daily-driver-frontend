import { useQuery } from "@tanstack/react-query";
import { getUserEvents } from "../../features/apiEvent";

export function useGetEvent() {
  const {
    data: events,
    error,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["events"],
    queryFn: () => getUserEvents(),
  });

  return { events, isPending, isError, error };
}
