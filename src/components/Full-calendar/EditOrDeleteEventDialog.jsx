import { useForm } from "react-hook-form";
import { useDeleteEvent } from "../../hooks/events/useDeleteEvent";
import { useEffect } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { convertToISOFormat, transformDate } from "../../lib/utils";
import { Button } from "../ui/button";
import { useUpdateEvent } from "../../hooks/events/useUpdateEvent";

/* eslint-disable react/prop-types */
export default function EditOrDeleteEventDialog({ isOpen, onClose, event }) {
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm();

  const { deleteEvent, isDeleting } = useDeleteEvent();
  const { updateEvent, isUpdatingEvent } = useUpdateEvent();

  useEffect(() => {
    if (event) {
      reset({
        eventName: event?.title ? event?.title : event.eventName,
        eventDescription: event?.description
          ? event?.description
          : event?.eventDescription,
        startDate: event?.start
          ? event?.start?.toISOString().substring(0, 10)
          : convertToISOFormat(event?.startDate),
        endDate: event?.end
          ? event?.end?.toISOString().substring(0, 10)
          : convertToISOFormat(event?.endDate),
      });
    }
  }, [event, reset]);

  const onSubmit = async (newEvent) => {
    const eventId = event?.id ? event.id : event._id;

    try {
      updateEvent(
        { eventId, newEvent },
        {
          onSuccess: () => {
            toast.success("Event updated successfully");
          },
          onError: (err) => {
            toast.error(err.message);
          },
          onSettled: () => {
            onClose(false);
          },
        }
      );
    } catch (err) {
      console.error(err);
      onClose(false);
      toast.error("Something went wrong.");
    }
  };

  const handleDelete = (e) => {
    e.preventDefault(); // Prevent form submission

    const eventId = event?.id ? event.id : event._id;

    if (!eventId) return null;

    try {
      deleteEvent(
        { eventId },
        {
          onSuccess: () => {
            toast.success("Event deleted successfully");
          },
        }
      );
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    } finally {
      onClose(false);
    }
  };

  return (
    <Dialog onOpenChange={onClose} open={isOpen} modal defaultOpen={false}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Or Delete Event</DialogTitle>
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

          <div className="flex justify-between">
            <Button
              className="justify-self-end"
              variant="destructive"
              disabled={isDeleting || isUpdatingEvent}
              onClick={handleDelete}
            >
              Delete event
            </Button>

            <Button
              type="submit"
              disabled={isUpdatingEvent || isDeleting}
              className="justify-self-end"
            >
              Save changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
