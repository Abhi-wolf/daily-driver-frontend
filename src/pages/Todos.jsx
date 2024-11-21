import SideCalender from "../components/TaskManagerComponents/SideCalender";
import TodosPage from "../components/TaskManagerComponents/TodosPage";

function Todos() {
  return (
    <section className="w-full h-full flex gap-4 justify-between ">
      <TodosPage />
      <SideCalender />
    </section>
  );
}

export default Todos;
