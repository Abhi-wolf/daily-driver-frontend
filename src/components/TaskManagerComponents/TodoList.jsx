/* eslint-disable react/prop-types */
import { LargeSpinner } from "../Spinners";
import TodoTable from "./TodoTable";
import DataNotFound from "../DataNotFound";

function TodoList({
  searchParams,
  todos,
  isGettingTodos,
  startDate,
  endDate,
  setEndDate,
  setStartDate,
}) {
  if (isGettingTodos) {
    return <LargeSpinner />;
  }

  return (
    <div className="flex-1 p-2 pt-4 md:p-8 flex flex-col gap-4 md:gap-8">
      <div className="flex flex-row flex-wrap justify-between items-center gap-2 md:gap-0">
        <div className="flex gap-3 md:gap-6">
          <h1 className="capitalize text-xl md:text-4xl font-semibold ">
            {formateSearchParams(searchParams.get("filter"))}
          </h1>

          <span className="border-2 border-gray-200 px-1 md:px-4 py-1 text-md md:text-2xl rounded-md text-gray-600">
            {todos?.length < 10 ? "0" + todos?.length : todos?.length}
          </span>
        </div>

        {searchParams.get("filter") === "all-todos" && (
          <div className="flex gap-2 ">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border rounded p-2"
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border rounded p-2"
            />
          </div>
        )}
      </div>

      {todos?.length === 0 ? (
        <DataNotFound size="2xl" />
      ) : (
        <TodoTable todos={todos} />
      )}
    </div>
  );
}

function formateSearchParams(param) {
  return param?.split("-").join(" ");
}

export default TodoList;
