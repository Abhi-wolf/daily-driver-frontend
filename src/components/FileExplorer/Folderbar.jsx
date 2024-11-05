/* eslint-disable react/prop-types */
import FolderOrFile from "../FolderOrFile";
import ToolTip from "../ToolTip";
import { Folder, NotebookPen } from "lucide-react";
import { useState } from "react";
import AddFileOrFolder from "../AddFolderOrFile";
import { useGetUserFileExplorer } from "../../hooks/fileExplorer/useGetFileExplorer";
import { MediumSpinner } from "../Spinners";

function Folderbar() {
  const { data: explorerData, isPending } = useGetUserFileExplorer();

  const [newFolder, setNewFolder] = useState(false);
  const [newFile, setNewFile] = useState(false);

  return (
    <div className="block w-[300px] min-h-full border-2 border-gray-400 rounded-r-3xl overflow-y-auto">
      <div className="w-full  py-4 flex flex-col gap-4">
        <h3 className="text-center text-violet-500 font-bold text-lg underline decoration-wavy py-2">
          Files And Folders
        </h3>

        <ul className="flex gap-8 justify-center items-center ">
          <li
            className="list-none cursor-pointer"
            onClick={() => setNewFile(!newFile)}
          >
            <ToolTip text="New Note">
              <NotebookPen className="h-4 w-4 hover:text-gray-400 transition" />
            </ToolTip>
          </li>
          <li
            className="list-none cursor-pointer"
            onClick={() => setNewFolder(!newFolder)}
          >
            <ToolTip text="New Folder">
              <Folder className="h-4 w-4 hover:text-gray-400 transition" />
            </ToolTip>
          </li>
        </ul>

        {newFolder && (
          <AddFileOrFolder
            isFolder={true}
            isOpen={newFolder}
            onClose={setNewFolder}
          />
        )}

        {newFile && (
          <AddFileOrFolder
            isFolder={false}
            isOpen={newFile}
            onClose={setNewFile}
          />
        )}
      </div>

      {isPending ? (
        // <div className="w-full h-full flex justify-center items-center">
        <MediumSpinner />
      ) : (
        // </div>
        <div className="overflow-y-hidden">
          {explorerData?.map((item) => {
            return <FolderOrFile folder={item} key={item._id} />;
          })}
        </div>
      )}
    </div>
  );
}

export default Folderbar;
