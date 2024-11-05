/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Todo from "./Todo";
import DataNotFound from "../DataNotFound";

function TodoList({ searchParams, todos }) {
  const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect(() => {
    if (todos?.length > 0) {
      const sortedTodos = [...todos].sort((a, b) => {
        // First sort by done status
        if (a.done === b.done) {
          // If both have the same done status, sort by priority
          return b.priority === a.priority ? 0 : b.priority ? 1 : -1;
        }
        // Completed todos should come last
        return a.done ? 1 : -1;
      });

      setFilteredTodos(sortedTodos);
    } else {
      setFilteredTodos([]);
    }
  }, [todos]);

  return (
    <div className="flex-1 p-8 flex flex-col gap-8">
      <div className="flex gap-6">
        <h1 className="capitalize text-4xl font-semibold ">
          {formateSearchParams(searchParams.get("filter"))}
        </h1>

        <span className="border-2 border-gray-200 px-4 py-1 text-2xl rounded-md text-gray-600">
          {filteredTodos?.length < 10
            ? "0" + filteredTodos.length
            : filteredTodos.length}
        </span>
      </div>

      <div className="flex flex-col gap-4 overflow-y-auto">
        {filteredTodos?.map((todo) => (
          <Todo todo={todo} key={todo._id} />
        ))}
      </div>

      {filteredTodos.length === 0 && <DataNotFound size="2xl" />}
    </div>
  );
}

function formateSearchParams(param) {
  return param?.split("-").join(" ");
}

export default TodoList;
