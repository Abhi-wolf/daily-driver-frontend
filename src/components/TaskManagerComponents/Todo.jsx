import { CalendarClock, Pin } from "lucide-react";
import { useState } from "react";
import { transformDateWithSlash } from "../../lib/utils";
import EditDeleteTodoDropDownMenu from "./EditDeleteTodoDropDownMenu";
import { useUpdateTodosStatus } from "../../hooks/todos/useUpdateTodosStatus";
import { toast } from "sonner";

/* eslint-disable react/prop-types */
function Todo({ todo }) {
  const [isDone, setIsDone] = useState(todo?.done);
  const { updateTodoStatus, isUpdatingTodoStatus } = useUpdateTodosStatus();

  function handleStatusChange() {
    const done = !isDone;

    // Call the update function with the new status
    updateTodoStatus(
      { todoId: todo._id, done },
      {
        onSuccess: () => {
          // Update local state after successful update
          setIsDone(done);
          toast.success(`Status updated to ${done ? "Done" : "Not Done"}`);
        },
        onError: (err) => {
          toast.error(err?.message);
        },
      }
    );
  }

  return (
    <div
      className={`${
        todo?.done ? "bg-gray-100" : "bg-gray-200"
      } p-2 pl-4 flex gap-4 items-center rounded-lg hover:bg-gray-200`}
    >
      <div>
        <input
          type="checkbox"
          checked={isDone}
          onChange={handleStatusChange}
          disabled={isUpdatingTodoStatus}
          name="status"
          className="peer relative appearance-none w-5 h-5 
                          border rounded-full border-green-400 
                          cursor-pointer  
                          checked:bg-green-400"
        />
      </div>
      {/* task detail */}
      <div className=" flex-1 flex flex-col gap-2 p-2">
        <h4 className={`${todo?.done && "line-through"} text-xl pl-2`}>
          {todo?.todoName}
        </h4>
        <div className="flex gap-6 px-4">
          <div className="flex gap-2 items-center justify-center text-green-500">
            <CalendarClock className="h-4 w-4" />
            <span>{transformDateWithSlash(todo?.dueDate)}</span>
          </div>

          <div className="flex gap-2 flex-wrap items-center justify-center text-white text-sm">
            <span
              className={`${
                todo?.priority && "bg-red-500 py-1 px-2 rounded-2xl"
              }`}
            >
              {todo?.priority && "High Priority"}
            </span>
          </div>

          <div className="flex gap-2 items-center justify-center text-orange-500">
            <Pin className="h-4 w-4" />
            <span>{todo?.label}</span>
          </div>
        </div>
      </div>

      <EditDeleteTodoDropDownMenu todo={todo} />
    </div>
  );
}

export default Todo;
