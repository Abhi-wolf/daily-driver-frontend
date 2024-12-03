/* eslint-disable react/prop-types */

import { Edit, EllipsisVertical } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import { useState } from "react";
import ExpenseForm from "./ExpenseForm";
import ConfirmDeleteDialog from "../ConfirmDeleteDialog";
import { useDeleteExpense } from "../../hooks/expense/useExpense";
import { toast } from "sonner";

function EditOrDeleteExpenseDropDown({ expense }) {
  const [openExpenseEditForm, setOpenExpenseEditForm] = useState(false);
  const [openConfirmDeleteDialog, setOpenConfirmDeleteDialog] = useState(false);
  const { deleteExpense } = useDeleteExpense();

  const handleDeleteExpense = async (e) => {
    e.preventDefault();

    deleteExpense(
      { expenseId: expense._id },
      {
        onSuccess: () => {
          toast.success("Expense Info deleted successfully");
        },
        onError: () => {
          toast.error("Something went wrong");
        },
      }
    );
    setOpenConfirmDeleteDialog(false);
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col gap-2 p-4">
        <ConfirmDeleteDialog
          onClose={setOpenConfirmDeleteDialog}
          open={openConfirmDeleteDialog}
          isPending={false}
          handleDelete={handleDeleteExpense}
          message="Once deleted the label cannot be recovered"
        />
        <Button
          variant="outline"
          className="flex gap-2 justify-between"
          onClick={() => setOpenExpenseEditForm(true)}
        >
          Edit <Edit className="w-4 h-4" />
        </Button>
      </DropdownMenuContent>

      {openExpenseEditForm && (
        <ExpenseForm
          mode="edit"
          expense={expense}
          isOpen={openExpenseEditForm}
          onClose={setOpenExpenseEditForm}
        />
      )}
    </DropdownMenu>
  );
}

export default EditOrDeleteExpenseDropDown;
