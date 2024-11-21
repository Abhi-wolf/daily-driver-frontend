import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { addDays, subDays } from "date-fns";
import { convertToISOFormat } from "../../lib/utils";
import TodoList from "./TodoList";
import { useGetTodos } from "../../hooks/todos/useGetTodos";

function TodosPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const today = new Date();

  const [startDate, setStartDate] = useState(
    convertToISOFormat(subDays(today, 15))
  );
  const [endDate, setEndDate] = useState(
    convertToISOFormat(addDays(today, 15))
  );

  const filter = searchParams.get("filter") || "today";
  const startDateParam = searchParams.get("startDate");
  const endDateParam = searchParams.get("endDate");

  const params = { filter };
  if (startDateParam) params.startDate = startDateParam;
  if (endDateParam) params.endDate = endDateParam;

  const { todos, isGettingTodos } = useGetTodos(params);

  useEffect(() => {
    if (!searchParams.get("filter")) {
      setSearchParams({ filter: "today" });
    }
    if (searchParams.get("filter") === "all-todos") {
      const currentParams = new URLSearchParams(location.search);

      currentParams.set("startDate", startDate);
      currentParams.set("endDate", endDate);

      navigate(`${location.pathname}?${currentParams.toString()}`);
    }
  }, [searchParams, startDate, endDate]);

  return (
    <div className="w-full overflow-y-auto">
      <TodoList
        searchParams={searchParams}
        todos={todos}
        isGettingTodos={isGettingTodos}
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />
    </div>
  );
}

export default TodosPage;
