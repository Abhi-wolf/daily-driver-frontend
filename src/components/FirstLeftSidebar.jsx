/* eslint-disable react/prop-types */
"use client";

import {
  BadgeIndianRupee,
  BookCheck,
  Bookmark,
  CalendarDays,
  Command,
  FolderPlus,
  Music,
  PencilLineIcon,
  Trash2Icon,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddOrEditTask from "./AddOrEditTask";
import ToolTip from "./ToolTip";
import { CommandDialogMenu } from "./CommandDialogMenu";

function FirstLeftSidebar() {
  const navigate = useNavigate();
  const [showCommandDialog, setShowCommandDialog] = useState(false);
  // const [addNewTaskModal, setAddNewTaskModal] = useState(false);

  return (
    <>
      <div className="border-[1px] border-gray-300 h-full pt-4">
        <div className="flex flex-col justify-between items-center h-full">
          <div className="flex flex-col justify-center gap-8 p-1 m-2 ">
            <li
              className="list-none cursor-pointer"
              onClick={() => navigate("/fileExplorer")}
            >
              <ToolTip text="File Explorer">
                <FolderPlus className="h-5 w-5 hover:text-gray-400 transition" />
              </ToolTip>
            </li>
            <li
              className="list-none cursor-pointer"
              onClick={() => setShowCommandDialog(true)}
            >
              <ToolTip text="⌘ J">
                <Command className="h-5 w-5 hover:text-gray-400 transition " />
              </ToolTip>
            </li>
            <li
              className="list-none cursor-pointer"
              onClick={() => navigate("/calendar")}
            >
              <ToolTip text="Calender">
                <CalendarDays className="h-5 w-5 hover:text-gray-400 transition" />
              </ToolTip>
            </li>

            <li
              className="list-none cursor-pointer"
              onClick={() => navigate("/tasksmanager")}
            >
              <ToolTip text="Task Manager">
                <BookCheck className="h-5 w-5 hover:text-gray-400 transition" />
              </ToolTip>
            </li>
            <li className="list-none cursor-pointer">
              <AddOrEditTask>
                <span>
                  <ToolTip text="New Task">
                    <PencilLineIcon className="h-5 w-5 hover:text-gray-400 transition" />
                  </ToolTip>
                </span>
              </AddOrEditTask>
            </li>

            <li
              className="list-none cursor-pointer"
              onClick={() => navigate("/expenses")}
            >
              <ToolTip text="Spendings & Savings">
                <BadgeIndianRupee className="h-5 w-5 hover:text-gray-400 transition" />
              </ToolTip>
            </li>

            <li
              className="list-none cursor-pointer"
              onClick={() => navigate("/music")}
            >
              <ToolTip text="Music">
                <Music className="h-5 w-5 hover:text-gray-400 transition" />
              </ToolTip>
            </li>
            <li
              className="list-none cursor-pointer"
              onClick={() => navigate(`/bookmarks/?page=1&limit=15`)}
            >
              <ToolTip text="Bookmarks">
                <Bookmark className="h-5 w-5 hover:text-gray-400 transition" />
              </ToolTip>
            </li>

            <li
              className="list-none cursor-pointer"
              onClick={() => navigate("/recyclebin")}
            >
              <ToolTip text="Recycle Bin">
                <Trash2Icon className="h-5 w-5 hover:text-gray-400 transition" />
              </ToolTip>
            </li>
          </div>

          {/* {addNewTaskModal && (
            <AddOrEditTask
              isOpen={addNewTaskModal}
              onClose={setAddNewTaskModal}
            />
          )} */}

          <CommandDialogMenu
            open={showCommandDialog}
            setOpen={setShowCommandDialog}
          />
        </div>
      </div>
    </>
  );
}

export default FirstLeftSidebar;
