/* eslint-disable react/prop-types */

import { EllipsisVertical } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import { useState, memo } from "react";
import { toast } from "sonner";
import { useDeleteLabel } from "../../hooks/labels/useDeleteLabel";
import ConfirmDeleteDialog from "../ConfirmDeleteDialog";

function EditOrDeleteLabelDropDown({ labelId }) {
  const [openConfirmDeleteDialog, setOpenConfirmDeleteDialog] = useState(false);
  const { deleteLabel, isDeletingLabel } = useDeleteLabel();

  const handleDeleteLabel = async (e) => {
    e.preventDefault();

    try {
      deleteLabel(
        { labelId },
        {
          onSuccess: () => {
            toast.success("Label successfully deleted");
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
          isPending={isDeletingLabel}
          handleDelete={handleDeleteLabel}
          message="Once deleted the label cannot be recovered"
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default memo(EditOrDeleteLabelDropDown);
