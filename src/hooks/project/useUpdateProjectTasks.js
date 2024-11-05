import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProjectTasks as updateProjectTasksApi } from "../../features/apiProject";
import { useParams } from "react-router";

export function useUpdateProjectTasks() {
  const queryClient = useQueryClient();
  const { projectId } = useParams();

  const { mutate: updateProjectTasks, isPending } = useMutation({
    mutationFn: updateProjectTasksApi,
    onSuccess: () => {
      if (projectId) {
        queryClient.invalidateQueries({ queryKey: ["project", projectId] });
      }
    },
  });

  return { updateProjectTasks, isPending };
}
