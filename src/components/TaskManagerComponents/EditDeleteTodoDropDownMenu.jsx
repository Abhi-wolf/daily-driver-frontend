/* eslint-disable react/prop-types */

import { EllipsisVertical } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useState } from "react";
import { toast } from "sonner";
import AddOrEditTask from "../AddOrEditTask";
import { useDeleteTodo } from "../../hooks/todos/useDeleteTodo";
import ConfirmDeleteDialog from "../ConfirmDeleteDialog";

function EditDeleteTodoDropDownMenu({ todo }) {
  const [openConfirmDeleteDialog, setOpenConfirmDeleteDialog] = useState(false);
  const [editTodoDialog, setEditTodoDialog] = useState(false);
  const { deleteTodo, isDeletingTodo } = useDeleteTodo();

  const handleDeleteTodo = async () => {
    try {
      deleteTodo(
        { todoId: todo._id },
        {
          onSuccess: () => {
            toast.success("Task successfully deleted");
          },
          onError: (error) => {
            toast.error(error?.message);
          },
        }
      );
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setOpenConfirmDeleteDialog(false);
    }
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
          isPending={isDeletingTodo}
          handleDelete={handleDeleteTodo}
          message="Once deleted the project cannot be recovered"
        />
        <Button variant="outline" onClick={() => setEditTodoDialog(true)}>
          Edit
        </Button>

        <AddOrEditTask
          isOpen={editTodoDialog}
          onClose={setEditTodoDialog}
          todo={todo}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default EditDeleteTodoDropDownMenu;
