/* eslint-disable react/prop-types */

import { EllipsisVertical } from "lucide-react";
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
import AddOrEditTask from "../AddOrEditTask";
import { useDeleteTodo } from "../../hooks/todos/useDeleteTodo";

function EditDeleteTodoDropDownMenu({ todo }) {
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);
  const [editTodoDialog, setEditTodoDialog] = useState(false);
  const { deleteTodo, isDeletingTodo } = useDeleteTodo();

  const handleDeleteProject = async () => {
    console.error("HANDLE DELETE");

    deleteTodo(
      { todoId: todo._id },
      {
        onSuccess: () => {
          toast.success("Task successfully deleted");
          setConfirmDeleteDialog(false);
        },
        onError: (error) => {
          toast.error(error?.message);
        },
      }
    );
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
          onClick={() => setConfirmDeleteDialog(true)}
        >
          Delete
        </Button>
        <Button variant="outline" onClick={() => setEditTodoDialog(true)}>
          {" "}
          Edit
        </Button>
        {editTodoDialog && (
          <AddOrEditTask
            isOpen={editTodoDialog}
            onClose={setEditTodoDialog}
            todo={todo}
          />
        )}
      </DropdownMenuContent>

      {confirmDeleteDialog && (
        <ConfirmDeleteDialog
          onClose={setConfirmDeleteDialog}
          isOpen={confirmDeleteDialog}
          isPending={isDeletingTodo}
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
            Once deleted the project cannot be recovered
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

export default EditDeleteTodoDropDownMenu;
