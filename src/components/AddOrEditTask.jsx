/* eslint-disable react/prop-types */
import { Button } from "./ui/button";
import { memo, useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { useForm, Controller } from "react-hook-form";
import { Textarea } from "./ui/textarea";
import { Separator } from "./ui/separator";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

import { CalendarClock, Flag } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { DayPicker } from "react-day-picker";
import { transformDate } from "../lib/utils";
import { useGetLabels } from "../hooks/labels/useGetLabels";
import { useCreateTodo } from "../hooks/todos/useCreateTodo";
import { toast } from "sonner";
import { useUpdateTodo } from "../hooks/todos/useUpdateTodo";

function AddOrEditTask({ todo, children }) {
  const { labels } = useGetLabels();
  const { createTodo, isCreatingTodo } = useCreateTodo();
  const { updateTodo, isUpdatingTodo } = useUpdateTodo();
  const [isOpen, onClose] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    reset,
    watch,
  } = useForm({
    defaultValues: {
      todoName: todo?.todoName ? todo?.todoName : "",
      todoDescription: todo?.todoDescription ? todo?.todoDescription : "",
      dueDate: todo?.dueDate ? todo?.dueDate : Date.now(),
      priority: todo?.priority ? todo?.priority : false,
      label: todo?.label ? todo?.label : "",
    },
  });

  const onSubmit = (newTodo) => {
    try {
      if (!todo) {
        createTodo(
          { newTodo },
          {
            onSuccess: () => {
              toast.success("Task created successfully");
              reset();
            },
            onError: (err) => {
              toast.error(err.message);
            },
          }
        );
      } else {
        updateTodo(
          { todoId: todo._id, newTodo },
          {
            onSuccess: () => {
              toast.success("Task updated successfully");
              reset();
            },
            onError: (err) => {
              toast.error(err.message);
            },
          }
        );
      }
    } catch (error) {
      console.error(error);
    } finally {
      onClose(false);
    }
  };

  const watchPriority = watch("priority");
  const watchDueDate = watch("dueDate");

  return (
    <Dialog onOpenChange={onClose} open={isOpen} modal defaultOpen={false}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle className="hidden">Task Form</DialogTitle>
        <form
          aria-disabled={isCreatingTodo || isUpdatingTodo}
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 "
        >
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Input
                id="todoName"
                placeholder="Task name ... "
                className=" rounded-md text-xl"
                {...register("todoName", { required: true })}
              />
              {errors.todoName && (
                <span className="text-red-400 my-1">Name is required.</span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Textarea
                id="todoDescription"
                rows={4}
                placeholder="Task description ... "
                className="rounded-md text-lg"
                {...register("todoDescription")}
              />
            </div>

            <div className="flex gap-4 items-center">
              <DropdownMenu className="mr-4">
                <DropdownMenuTrigger asChild>
                  <div className="flex gap-2 border-2 border-gray-300 hover:border-gray-500 p-2 rounded-md text-gray-500 text-sm cursor-pointer hover:text-gray-600 font-semibold">
                    <CalendarClock className="h-5 w-5 hover:text-gray-400 transition cursor-pointer " />
                    <span>{transformDate(watchDueDate)}</span>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="p-6 mr-4">
                  <DayPicker
                    mode="single"
                    selected={watchDueDate}
                    onSelect={(date) => setValue("dueDate", date)}
                  />
                </DropdownMenuContent>
              </DropdownMenu>

              <div
                onClick={() => setValue("priority", !watchPriority)}
                className={`${
                  watchPriority
                    ? "text-red-600 border-red-300 hover:text-red-600 hover:border-red-300 bg-red-300"
                    : "text-green-600  border-green-300 hover:text-green-600 hover:border-green-300 bg-green-300"
                } flex gap-2 border-2   p-2 rounded-md text-sm cursor-pointer  font-semibold`}
              >
                <Flag className="w-5 h-5" />
                <span>{watchPriority ? "High Priority" : "Low Priority"}</span>
              </div>
            </div>

            <Separator className="h-[1px] bg-gray-400" />
          </div>

          <div className="flex justify-between">
            <Controller
              name="label"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={(value) => field.onChange(value)} // Handle value change explicitly
                  value={field.value} // Set the selected value
                >
                  <SelectTrigger className="w-[120px] border-gray-400 text-gray-500 font-semibold">
                    <SelectValue placeholder="Label" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {labels?.map((label) => (
                        <SelectItem value={label?.labelName} key={label._id}>
                          {label?.labelName}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />

            <Button type="submit" disabled={isCreatingTodo || isUpdatingTodo}>
              {isCreatingTodo || isUpdatingTodo
                ? "Saving changes ..."
                : " Save changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default memo(AddOrEditTask);
