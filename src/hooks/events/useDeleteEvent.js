import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteEvent as deleteEventApi } from "../../features/apiEvent";

export function useDeleteEvent() {
  const queryClient = useQueryClient();

  const { mutate: deleteEvent, isPending: isDeleting } = useMutation({
    mutationFn: deleteEventApi,
    onMutate: async (deletedEvent) => {
      await queryClient.cancelQueries({ queryKey: ["events"] });

      const previousEvents = queryClient.getQueryData(["events"]);

      queryClient.setQueryData(["events"], (oldEvents) =>
        oldEvents
          ? oldEvents?.filter((event) => event._id !== deletedEvent.eventId)
          : []
      );

      return { previousEvents };
    },

    onError: (context) => {
      queryClient.setQueryData(["events"], context.previousEvents);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });

  return { deleteEvent, isDeleting };
}
