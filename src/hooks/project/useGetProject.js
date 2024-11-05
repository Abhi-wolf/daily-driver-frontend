import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getProject } from "../../features/apiProject";

export function useGetProject() {
  const { projectId } = useParams();

  const { data: project, isPending } = useQuery({
    queryKey: ["project", projectId],
    queryFn: () => getProject({ projectId }),
  });

  return { project, isPending };
}
