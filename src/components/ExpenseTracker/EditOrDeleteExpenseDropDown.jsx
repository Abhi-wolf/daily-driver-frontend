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

function EditOrDeleteExpenseDropDown({ expense }) {
  const [openExpenseEditForm, setOpenExpenseEditForm] = useState(false);
  const [openConfirmDeleteDialog, setOpenConfirmDeleteDialog] = useState(false);

  const handleDeleteExpense = async () => {
    setOpenConfirmDeleteDialog(false);
  };

  return (
    <DropdownMenu>
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
