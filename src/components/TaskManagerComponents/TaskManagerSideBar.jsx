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

function TaskManagerSideBar() {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const { setprojectToOpen } = useProjectStore();
  const { projects, isPending: isGettingProjects } = useGetProjects();
  const { labels, isPending: isGettingLabels } = useGetLabels();
  const [addNewTaskModal, setAddNewTaskModal] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  function handleChangeFilter(value) {
    if (location.pathname === "/tasksmanager/todos") {
      setSearchParams({ filter: value });
    } else {
      navigate(`/tasksmanager/todos?filter=${value}`);
    }
  }

  return (
    <div className="block w-[300px] min-h-full border-2 border-gray-400  p-4 pt-8 rounded-r-3xl overflow-y-auto">
      <div className="flex flex-col gap-10 h-full overflow-y-auto">
        {/* Upper Part */}
        <ul className="flex flex-col   ">
          <li
            onClick={() => setAddNewTaskModal(true)}
            className="list-none flex gap-4 items-center text-orange-500 font-semibold cursor-pointer hover:bg-orange-200 p-2 rounded-3xl"
          >
            <PlusCircle className="h-6 w-6" />{" "}
            <span className="text-lg">Add Task</span>
          </li>
          <li
            onClick={() => handleChangeFilter("today")}
            className="list-none flex gap-4 items-center cursor-pointer hover:bg-orange-200 p-2 rounded-3xl"
          >
            <CalendarClock className="h-5 w-5" />{" "}
            <span className="text-lg">Today</span>
          </li>
          <li
            onClick={() => handleChangeFilter("this-week")}
            className="list-none flex gap-4 items-center cursor-pointer hover:bg-orange-200 p-2 rounded-3xl"
          >
            <CalendarDaysIcon className="h-5 w-5" />{" "}
            <span className="text-lg">This week</span>
          </li>
          <li
            onClick={() => handleChangeFilter("next-week")}
            className="list-none flex gap-4 items-center cursor-pointer hover:bg-orange-200 p-2 rounded-3xl"
          >
            <CalendarDaysIcon className="h-5 w-5" />{" "}
            <span className="text-lg">Next Week</span>
          </li>

          {addNewTaskModal && (
            <AddOrEditTask
              isOpen={addNewTaskModal}
              onClose={setAddNewTaskModal}
            />
          )}
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
