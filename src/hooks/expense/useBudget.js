import { useMutation } from "@tanstack/react-query";
import { updateBudget as updateBudgetApi } from "../../features/apiBudget";

export function useUpdateBudget() {
  const {
    mutate: updateBudget,
    isPending: isUpdatingBudget,
    isError,
    error,
  } = useMutation({
    mutationFn: updateBudgetApi,
  });

  return { updateBudget, isUpdatingBudget, isError, error };
}
