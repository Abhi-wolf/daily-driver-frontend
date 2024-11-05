import { useMutation, useQuery } from "@tanstack/react-query";

import {
  createExpense,
  deleteExpense as deleteExpenseApi,
  getExpenses,
  getExpensesByMonth,
  getExpenseSummary,
  updateExpense as updateExpenseApi,
} from "../../features/apiExpense";

export function useGetExpenses(filter) {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["expense", filter],
    queryFn: () => getExpenses(filter),
    enabled: !!filter.start,
  });

  return { data, isPending, isError, error };
}
export function useGetMonthlyExpenses() {
  const {
    data: monthlyExpenses,
    error,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["monthlyExpenses"],
    queryFn: () => getExpensesByMonth(),
  });

  return { monthlyExpenses, isPending, isError, error };
}

export function useGetExpenseSummary() {
  const {
    data: expenseSummary,
    error,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["expenseSummary"],
    queryFn: () => getExpenseSummary(),
  });

  return { expenseSummary, isPending, isError, error };
}

export function useUpdateExpense() {
  const { mutate: updateExpense, isPending: isUpdatingExpense } = useMutation({
    mutationFn: updateExpenseApi,
  });

  return { updateExpense, isUpdatingExpense };
}

export function useAddExpense() {
  const { mutate: addExpense, isPending: isAddingExpense } = useMutation({
    mutationFn: createExpense,
  });

  return { addExpense, isAddingExpense };
}

export function useDeleteExpense() {
  const { mutate: deleteExpense, isPending: isDeletingExpense } = useMutation({
    mutationFn: deleteExpenseApi,
  });

  return { deleteExpense, isDeletingExpense };
}
