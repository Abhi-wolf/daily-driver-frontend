import { useQuery } from "@tanstack/react-query";
import { getLabels } from "../../features/apiLabels";

export function useGetLabels() {
  const { data: labels, isPending } = useQuery({
    queryKey: ["labels"],
    queryFn: () => getLabels(),
  });

  return { labels, isPending };
}
