/* eslint-disable no-unused-vars */
import {
  CalendarClock,
  CalendarDaysIcon,
  HashIcon,
  PlusCircle,
} from "lucide-react";
import { useProjectStore } from "../../store";
import { useLocation, useNavigate, useParams } from "react-router";
import { useGetProjects } from "../../hooks/project/useGetProjects";
import { SmallSpinner } from "../Spinners";
import { useGetLabels } from "../../hooks/labels/useGetLabels";
import AddLabelModel from "./AddLabelModel";
import EditDeleteProjectDropDown from "./EditDeleteProjectDropDown";
import AddOrEditProjectModel from "./AddOrEditProjectModel";
import EditOrDeleteLabelDropDown from "./EditOrDeleteLabelDropDown";
import AddOrEditTask from "../AddOrEditTask";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "../ui/button";

function TaskManagerSideBar() {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const { setprojectToOpen } = useProjectStore();
  const { projects, isPending: isGettingProjects } = useGetProjects();
  const { labels, isPending: isGettingLabels } = useGetLabels();
  const [addNewTaskModal, setAddNewTaskModal] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const filter = searchParams.get("filter");

  function handleChangeFilter(value) {
    if (location.pathname === "/tasksmanager/todos") {
      setSearchParams({ filter: value });
    } else {
      navigate(`/tasksmanager/todos?filter=${value}`);
    }
  }

  return (
    <div className="block w-[260px] md:w-[300px] min-h-full border-2 border-gray-400  p-1 md:p-4 pt-8 rounded-r-3xl overflow-y-auto ">
      <div className="flex flex-col gap-10 h-full overflow-y-auto">
        {/* Upper Part */}
        <ul className="flex flex-col  gap-1 md:gap-2">
          <li>
            <AddOrEditTask>
              <Button
                className="w-full gap-2 md:gap-4 flex flex-row justify-start cursor-pointer rounded-3xl p-2 bg-orange-300 hover:bg-orange-300"
                variant="ghost"
              >
                <PlusCircle className="h-6 w-6" />{" "}
                <span className="text-lg">Add Task</span>
              </Button>
            </AddOrEditTask>
          </li>
          <li
            onClick={() => handleChangeFilter("today")}
            className={`list-none flex gap-4 items-center cursor-pointer  p-2 rounded-3xl ${
              filter === "today"
                ? "text-green-500 bg-gray-200"
                : "hover:bg-orange-200"
            }`}
          >
            <CalendarClock className="h-5 w-5" />{" "}
            <span className="text-lg">Today</span>
          </li>
          <li
            onClick={() => handleChangeFilter("this-week")}
            className={`list-none flex gap-4 items-center cursor-pointer  p-2 rounded-3xl ${
              filter === "this-week"
                ? "text-green-500 bg-gray-200"
                : "hover:bg-orange-200"
            }`}
          >
            <CalendarDaysIcon className="h-5 w-5" />{" "}
            <span className="text-lg">This week</span>
          </li>
          <li
            onClick={() => handleChangeFilter("next-week")}
            className={`list-none flex gap-4 items-center cursor-pointer  p-2 rounded-3xl ${
              filter === "next-week"
                ? "text-green-500 bg-gray-200"
                : "hover:bg-orange-200"
            }`}
          >
            <CalendarDaysIcon className="h-5 w-5" />{" "}
            <span className="text-lg">Next Week</span>
          </li>
          <li
            onClick={() => handleChangeFilter("all-todos")}
            className={`list-none flex gap-4 items-center cursor-pointer  p-2 rounded-3xl ${
              filter === "all-todos"
                ? "text-green-500 bg-gray-200"
                : "hover:bg-orange-200"
            }`}
          >
            <CalendarDaysIcon className="h-5 w-5" />{" "}
            <span className="text-lg">All Todos</span>
          </li>
        </ul>

        {/* labels */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold text-gray-400">My Labels</h2>
          {isGettingLabels ? (
            <SmallSpinner />
          ) : (
            <ul className="flex flex-col gap-2 text-gray-500">
              {labels?.map((label) => (
                <li
                  key={label._id}
                  className="flex gap-4 justify-between  hover:text-gray-600 hover:font-semibold"
                >
                  <div className="flex gap-4">
                    <HashIcon className="h-5 w-5 text-purple-500" />{" "}
                    <span>{label.labelName}</span>
                  </div>
                  <EditOrDeleteLabelDropDown labelId={label._id} />
                </li>
              ))}

              <AddLabelModel />
            </ul>
          )}
        </div>

        {/* projects */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold text-gray-400">My Projects</h2>
          {isGettingProjects ? (
            <SmallSpinner />
          ) : (
            <ul className="flex flex-col gap-2 text-gray-500 ">
              {projects?.map((project) => (
                <li
                  key={project._id}
                  onClick={() => {
                    setprojectToOpen(project?._id);
                    navigate(`/tasksmanager/project/${project._id}`);
                  }}
                  className={`${
                    projectId === project._id ? "text-green-400" : ""
                  } flex justify-between cursor-pointer  hover:font-semibold`}
                >
                  <div className="flex gap-4">
                    <HashIcon className="h-5 w-5 text-purple-500" />{" "}
                    <span>{project.projectName}</span>
                  </div>
                  <EditDeleteProjectDropDown projectId={projectId} />
                </li>
              ))}

              <AddOrEditProjectModel />
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default TaskManagerSideBar;
