import { useQuery } from "@tanstack/react-query";
import { getProjects } from "../../features/apiProject";

export function useGetProjects() {
  const {
    data: projects,
    error,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: () => getProjects(),
  });

  return { projects, isPending, isError, error };
}
