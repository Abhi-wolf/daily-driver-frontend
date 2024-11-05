import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addNewProject as addNewProjectApi } from "../../features/apiProject";

export function useAddProject() {
  const queryClient = useQueryClient();

  const { mutate: addNewProject, isPending } = useMutation({
    mutationFn: addNewProjectApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });

  return { addNewProject, isPending };
}
