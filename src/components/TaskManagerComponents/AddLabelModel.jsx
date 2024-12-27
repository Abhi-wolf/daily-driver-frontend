/* eslint-disable react/prop-types */

import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader, PlusCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useAddLabel } from "../../hooks/labels/useAddLabel";

function AddLabelModel() {
  const { addNewLabel, isPending } = useAddLabel();
  const [isOpen, onClose] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (newLabel) => {
    try {
      addNewLabel(
        { newLabel },
        {
          onSuccess: () => {
            toast.success("Label added successfully");
            onClose(false);
            reset();
          },
          onError: (error) => {
            toast.error(error?.message);
          },
        }
      );
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Dialog onOpenChange={onClose} open={isOpen} modal defaultOpen={false}>
      <DialogTrigger asChild>
        <li className="list-none flex gap-4 items-center text-orange-400 font-semibold cursor-pointer hover:text-orange-700">
          <PlusCircle className="h-5 w-5" />{" "}
          <span className="text-md">Create new Label</span>
        </li>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] p-8 text-gray-600">
        <DialogHeader>
          <DialogTitle>Create A New Label</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 "
        >
          <div className="flex flex-col  gap-4">
            <Label htmlFor="labelName" className="text-left capitalize">
              Label name
            </Label>
            <Input
              id="labelName"
              className="col-span-3"
              disabled={isPending}
              {...register("labelName", { required: true })}
            />

            {errors.labelName && (
              <span className="text-red-400 my-1">Name is required.</span>
            )}
          </div>

          <Button type="submit" disabled={isPending}>
            {isPending && <Loader className="w-4 h-4 animate-spin mr-2" />}
            {isPending ? "Creating..." : "Create Label"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddLabelModel;
