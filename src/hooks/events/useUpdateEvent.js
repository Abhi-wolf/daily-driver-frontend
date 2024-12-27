import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateEvent as updateEventApi } from "../../features/apiEvent";

export function useUpdateEvent() {
  const queryClient = useQueryClient();

  const { mutate: updateEvent, isPending: isUpdatingEvent } = useMutation({
    mutationFn: updateEventApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });

  return { updateEvent, isUpdatingEvent };
}
