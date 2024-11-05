/* eslint-disable react/prop-types */

import { Edit, EllipsisVertical, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import ExpenseForm from "./ExpenseForm";

function EditOrDeleteExpenseDropDown({ expense }) {
  const [openExpenseEditForm, setOpenExpenseEditForm] = useState(false);
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);
  const navigate = useNavigate();

  const handleDeleteProject = async () => {
    console.error("HANDLE DELETE");

    // deleteProject(
    //   { projectId },
    //   {
    //     onSuccess: () => {
    //       toast.success("Project successfully deleted");
    //       setConfirmDeleteDialog(false);
    //       navigate("/tasksmanager");
    //     },
    //     onError: (error) => {
    //       console.log(error);
    //       toast.error(error?.message);
    //     },
    //   }
    // );
    setConfirmDeleteDialog(false);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col gap-2 p-4">
        <Button
          variant="destructive"
          className="flex gap-2 justify-between"
          onClick={() => setConfirmDeleteDialog(true)}
        >
          Delete <Trash2 className="w-4 h-4" />
        </Button>

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
      {confirmDeleteDialog && (
        <ConfirmDeleteDialog
          onClose={setConfirmDeleteDialog}
          isOpen={confirmDeleteDialog}
          handleDeleteProject={handleDeleteProject}
        />
      )}
    </DropdownMenu>
  );
}

function ConfirmDeleteDialog({
  onClose,
  isOpen,
  handleDeleteProject,
  isPending,
}) {
  return (
    <Dialog onOpenChange={onClose} open={isOpen} modal defaultOpen={false}>
      <DialogContent className="sm:max-w-[425px] p-8">
        <DialogHeader>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogDescription>
            Once deleted the expense cannot be recovered
          </DialogDescription>
        </DialogHeader>
        <Button
          type="submit"
          variant="destructive"
          disabled={isPending}
          onClick={handleDeleteProject}
        >
          Confirm Delete
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default EditOrDeleteExpenseDropDown;
