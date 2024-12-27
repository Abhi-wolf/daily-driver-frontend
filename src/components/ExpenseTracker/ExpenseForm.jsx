/* eslint-disable react/prop-types */
import { Controller, useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { expensecategory, paymentmode } from "../../constants/expenseConstants";
import { Label } from "../ui/label";
import {
  useAddExpense,
  useUpdateExpense,
} from "../../hooks/expense/useExpense";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { Loader } from "lucide-react";

function ExpenseForm({ onClose, isOpen, expense, mode = "create" }) {
  const { addExpense, isAddingExpense } = useAddExpense();
  const { updateExpense, isUpdatingExpense } = useUpdateExpense();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    reset,
    watch,
  } = useForm({
    defaultValues: {
      category: expense?.category ? expense.category : "",
      description: expense?.description ? expense.description : "",
      date: new Date().toISOString().split("T")[0],
      modeOfPayment: expense?.modeOfPayment ? expense.modeOfPayment : "",
      amount: expense?.amount ? expense.amount : 100,
    },
  });

  const onSubmit = (data) => {
    if (mode == "create") {
      addExpense(
        { data },
        {
          onSuccess: () => {
            toast.success("Expense added successfully");
            queryClient.invalidateQueries({
              predicate: (query) => query.queryKey[0] === "expense",
            });
            queryClient.invalidateQueries({ queryKey: ["monthlyExpenses"] });
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
    } else {
      updateExpense(
        { data, expenseId: expense._id },
        {
          onSuccess: () => {
            toast.success("Expense updated successfully");
            queryClient.invalidateQueries({
              predicate: (query) => query.queryKey[0] === "expense",
            });
            queryClient.invalidateQueries({ queryKey: ["monthlyExpenses"] });
            onClose(false);
          },
          onError: () => {
            toast.error("Something went wrong");
            onClose(false);
          },
        }
      );
    }
  };

  return (
    <Dialog onOpenChange={onClose} open={isOpen} modal defaultOpen={false}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Expense</DialogTitle>
          <DialogDescription>
            Add Or Edit your daily expenses.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 p-4">
          <div className="w-full flex flex-col gap-2">
            <Label htmlFor="category" className="text-left">
              Category
            </Label>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={(value) => field.onChange(value)}
                  value={field.value || ""}
                >
                  <SelectTrigger className="w-full border-gray-400 text-gray-500">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {expensecategory.map((category, index) => (
                        <SelectItem value={category} key={index}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="description" className="text-left">
              Description
            </Label>
            <Textarea
              placeholder="Type your expense description here."
              id="description"
              className="col-span-3"
              {...register("description", {
                required: "Description is required",
              })}
            />
            {errors.description && (
              <p className="text-red-400 text-xs">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="amount" className="text-left">
              Amount
            </Label>
            <Input
              id="amount"
              type="number"
              min="0"
              defaultValue={10}
              className="col-span-3"
              {...register("amount", { required: "Amount is required" })}
            />
            {errors.amount && (
              <p className="text-red-400 text-xs">{errors.amount.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-4">
            <Label htmlFor="date" className="text-left">
              Expense Date
            </Label>
            <Input
              id="date"
              type="date"
              className="col-span-3"
              {...register("date", { required: "Date is required" })}
              aria-invalid={errors.date ? "true" : "false"}
              value={watch("date")} // Bind the input to form state
              onChange={(e) => setValue("date", e.target.value)} // Handle change explicitly
            />
            {errors.date && (
              <p className="text-red-400 text-xs">{errors.date.message}</p>
            )}
          </div>

          <div className="w-full flex flex-col gap-2">
            <Label htmlFor="modeOfPayment" className="text-left">
              Mode Of Payment
            </Label>
            <Controller
              name="modeOfPayment"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={(value) => field.onChange(value)}
                  value={field.value || ""}
                >
                  <SelectTrigger className="w-full border-gray-400 text-gray-500">
                    <SelectValue placeholder="Mode of Payment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {paymentmode.map((payment, index) => (
                        <SelectItem value={payment} key={index}>
                          {payment}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div className="flex flex-row-reverse">
            <Button
              type="submit"
              className="flex gap-2"
              disabled={isAddingExpense || isUpdatingExpense}
            >
              {(isAddingExpense || isUpdatingExpense) && (
                <Loader className="h-4 w-4 animate-spin" />
              )}
              {isAddingExpense || isUpdatingExpense ? "Saving" : "Save changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default ExpenseForm;
