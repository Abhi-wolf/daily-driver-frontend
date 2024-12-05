/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

import { Button } from "../ui/button";
import { Label } from "../ui/label";

import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useUpdateBudget } from "../../hooks/expense/useBudget";
import { useEffect } from "react";

function BudgetForm({ onClose, isOpen, budget }) {
  const queryClient = useQueryClient();
  const { updateBudget, isError, isUpdatingBudget, error } = useUpdateBudget();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      description: "",
      amount: budget,
    },
  });

  const onSubmit = (data) => {
    updateBudget(
      { data },
      {
        onSuccess: () => {
          toast.success("Budget updated successfully");
          queryClient.invalidateQueries({
            predicate: (query) => query.queryKey[0] === "expense",
          });
          queryClient.invalidateQueries({ queryKey: ["expenseSummary"] });
          onClose(false);
          reset();
        },
        onError: () => {
          toast.error("Something went wrong");
          onClose(false);
        },
      }
    );
  };

  useEffect(() => {
    if (budget) {
      setValue("amount", budget);
    }
  }, [budget]);

  return (
    <Dialog onOpenChange={onClose} open={isOpen} modal defaultOpen={false}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Budget</DialogTitle>
          <DialogDescription>
            Add Or Edit your monthly budget.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 p-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="description" className="text-left">
              Description
            </Label>
            <Textarea
              placeholder="Type your budget description here."
              id="description"
              className="col-span-3"
              {...register("description")}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="amount" className="text-left">
              Amount
            </Label>
            <Input
              id="amount"
              type="number"
              min="0"
              //   defaultValue={10}
              className="col-span-3"
              {...register("amount", { required: "Amount is required" })}
            />
            {errors.amount && (
              <p className="text-red-400 text-sm">{errors.amount.message}</p>
            )}
          </div>

          <div className="flex flex-row-reverse">
            <Button type="submit" disabled={isUpdatingBudget}>
              Save changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default BudgetForm;
