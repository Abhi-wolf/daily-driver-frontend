import { Outlet } from "react-router";
import TaskManagerSideBar from "../components/TaskManagerComponents/TaskManagerSideBar";

function TaskManager() {
  return (
    <>
      <TaskManagerSideBar />
      {/* <div className="w-full overflow-y-auto overflow-x-hidden"> */}
      <div className="w-full  overflow-x-hidden">
        <Outlet />
      </div>
    </>
  );
}

export default TaskManager;
