/* eslint-disable react/prop-types */
import { Loader, Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";

function ConfirmDeleteDialog({ open, handleDelete, isPending, onClose }) {
  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogTrigger asChild>
        <Button
          className="flex gap-3 w-full"
          variant="destructive"
          onClick={() => onClose(true)}
        >
          <Trash className="w-4 h-4" /> Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this data
            from our servers. Please think carefully before moving forward.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            disabled={isPending}
            onClick={() => onClose(false)}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction disabled={isPending} onClick={handleDelete}>
            {isPending && <Loader className="w-4 h-4 animate-spin" />}
            {isPending ? "Deleting ..." : "Continue"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default ConfirmDeleteDialog;
