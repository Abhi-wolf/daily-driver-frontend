import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteEvent as deleteEventApi } from "../../features/apiEvent";

export function useDeleteEvent() {
  const queryClient = useQueryClient();

  const { mutate: deleteEvent, isPending: isDeleting } = useMutation({
    mutationFn: deleteEventApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["events"]);
    },
  });

  return { deleteEvent, isDeleting };
}
