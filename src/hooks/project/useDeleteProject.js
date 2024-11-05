import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProject as deleteProjectApi } from "../../features/apiProject";

export function useDeleteProject() {
  const queryClient = useQueryClient();

  const { mutate: deleteProject, isPending } = useMutation({
    mutationFn: deleteProjectApi,
    onSuccess: (projectId) => {
      if (projectId) {
        queryClient.removeQueries({ queryKey: ["project", projectId] });
      }
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });

  return { deleteProject, isPending };
}
