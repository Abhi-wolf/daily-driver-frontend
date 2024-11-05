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
import { useNavigate } from "react-router";
import { useDeleteLabel } from "../../hooks/labels/useDeleteLabel";

function EditOrDeleteLabelDropDown({ labelId }) {
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);
  const navigate = useNavigate();
  const { deleteLabel, isDeletingLabel } = useDeleteLabel();

  const handleDeleteLabel = async () => {
    deleteLabel(
      { labelId },
      {
        onSuccess: () => {
          toast.success("Label successfully deleted");
          setConfirmDeleteDialog(false);
          navigate("/tasksmanager");
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
          Delete Label
        </Button>
      </DropdownMenuContent>

      {confirmDeleteDialog && (
        <ConfirmDeleteDialog
          onClose={setConfirmDeleteDialog}
          isOpen={confirmDeleteDialog}
          isPending={isDeletingLabel}
          handleDeleteLabel={handleDeleteLabel}
        />
      )}
    </DropdownMenu>
  );
}

function ConfirmDeleteDialog({
  onClose,
  isOpen,
  handleDeleteLabel,
  isDeletingLabel,
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
          disabled={isDeletingLabel}
          onClick={handleDeleteLabel}
        >
          Confirm Delete
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default EditOrDeleteLabelDropDown;
