/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { useAddEvent } from "../hooks/events/useAddEvent";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { transformDate } from "../lib/utils";
import { Button } from "./ui/button";

export default function AddEventDialog({
  isOpen,
  onClose,
  selected,
  setSelected,
}) {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const { addEvent, isPending } = useAddEvent();

  const onSubmit = async (data) => {
    setSelected("");

    const newEvent = {
      eventName: data?.eventName,
      eventDescription: data?.eventDescription,
      startDate: data.startDate,
      endDate: data.endDate,
      id: uuidv4(),
    };

    try {
      addEvent(
        { newEvent },
        {
          onSuccess: (data) => {
            toast.success("Event Added successfully");
          },
          onError: (err) => {
            toast.error(err.message);
            console.log(err.message);
          },
        }
      );
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    }

    onClose(!isOpen);
  };

  return (
    <Dialog onOpenChange={onClose} open={isOpen} modal defaultOpen={false}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Event</DialogTitle>
          <DialogDescription>
            Add important event&apos;s to get notifications on time.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div className="flex flex-col   gap-4">
            <Label htmlFor="eventName" className="text-left">
              Event Name
            </Label>
            <Input
              id="eventName"
              className="col-span-3"
              {...register("eventName", { required: true })}
              aria-invalid={errors.eventName ? "true" : "false"}
            />

            {errors.eventName && (
              <p className="text-red-400 text-sm">Event name is required</p>
            )}
          </div>
          <div className="flex flex-col   gap-4">
            <Label htmlFor="eventDescription" className="text-left">
              Event Description
            </Label>
            <Textarea
              placeholder="Type your event description here."
              id="eventDescription"
              className="col-span-3"
              {...register("eventDescription")}
            />
          </div>
          <div className="flex flex-col   gap-4">
            <Label htmlFor="startDate" className="text-left">
              From
            </Label>
            <Input
              id="startDate"
              type="date"
              defaultValue={transformDate(selected?.from)}
              className="col-span-3"
              {...register("startDate", {
                required: true,
              })}
            />
          </div>
          <div className="flex flex-col   gap-4">
            <Label htmlFor="endDate" className="text-left">
              To
            </Label>
            <Input
              id="endDate"
              type="date"
              defaultValue={
                selected?.to
                  ? transformDate(selected?.to)
                  : transformDate(selected?.from)
              }
              className="col-span-3"
              {...register("endDate", {
                required: true,
                validate: (match) => {
                  const startDate = getValues("startDate");

                  return (
                    transformDate(startDate) <= transformDate(match) ||
                    "End date cannot be smaller than start date"
                  );
                },
              })}
              aria-invalid={errors.endDate ? "true" : "false"}
            />
            {errors.endDate && (
              <p className="text-red-400 text-sm">
                {errors.endDate?.message
                  ? errors.endDate?.message
                  : "Date is required"}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="justify-self-end"
            disabled={isPending}
          >
            Save changes
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
