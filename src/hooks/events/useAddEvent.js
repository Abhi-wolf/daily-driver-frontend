import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addEvent as addEventApi } from "../../features/apiEvent";

export function useAddEvent() {
  const queryClient = useQueryClient();

  const { mutate: addEvent, isPending } = useMutation({
    mutationFn: addEventApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });

  return { addEvent, isPending };
}
