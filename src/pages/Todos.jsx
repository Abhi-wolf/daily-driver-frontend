import SideCalender from "../components/TaskManagerComponents/SideCalender";
import { useGetTodos } from "../hooks/todos/useGetTodos";
import { useSearchParams } from "react-router-dom";
import TodoList from "../components/TaskManagerComponents/TodoList";
import { useEffect } from "react";

function Todos() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filter = searchParams.get("filter");
  const { todos } = useGetTodos(filter);

  useEffect(() => {
    if (!searchParams.get("filter")) {
      setSearchParams({ filter: "today" });
    }
  }, []);

  return (
    <section className="w-full h-full flex gap-4">
      <TodoList searchParams={searchParams} todos={todos} />
      <SideCalender />
    </section>
  );
}

export default Todos;
