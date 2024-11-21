import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProject as deleteProjectApi } from "../../features/apiProject";

export function useDeleteProject() {
  const queryClient = useQueryClient();

  const { mutate: deleteProject, isPending } = useMutation({
    mutationFn: deleteProjectApi,

    // onMutate: async (deletedProjest) => {
    //   console.log(deletedProjest.projectId);
    //   queryClient.removeQueries({
    //     queryKey: ["project", deletedProjest.projectId],
    //   });

    //   await queryClient.cancelQueries({ queryKey: ["projects"] });

    //   const previousProjects = queryClient.getQueryData(["projects"]);

    //   queryClient.setQueryData(["projects"], (oldProjects) =>
    //     oldProjects
    //       ? oldProjects?.filter(
    //           (project) => project._id !== deletedProjest.projectId
    //         )
    //       : []
    //   );

    //   return { previousProjects };
    // },

    // onError: (context) => {
    //   queryClient.setQueryData(["projects"], context.previousProjects);
    // },
    onSuccess: (projectId) => {
      if (projectId) {
        queryClient.removeQueries({ queryKey: ["project", projectId] });
      }
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });

  return { deleteProject, isPending };
}
