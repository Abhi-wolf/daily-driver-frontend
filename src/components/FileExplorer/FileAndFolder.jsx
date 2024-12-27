/* eslint-disable react/prop-types */
import {
  ChevronDown,
  ChevronRight,
  Edit,
  File,
  Folder,
  Plus,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import AddFileOrFolder from "./AddFolderOrFile";
import {
  useDeleteFolder,
  useGetFolder,
} from "../../hooks/fileExplorer/useFolder";
import { useDeleteFile } from "../../hooks/fileExplorer/useFile";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export default function FileAndFolder({ item }) {
  const params = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [newFileFolderDialog, setNewFileFolderDialog] = useState(false);
  const [newFileOrFolder, setNewFileOrFolder] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [mode, setMode] = useState("create");

  const { deleteFolder, isDeletingFolder } = useDeleteFolder();
  const { deleteFile } = useDeleteFile();
  const { data: contents } = useGetFolder(
    isExpanded && item.type === "folder" ? item._id : null
  );

  const isActive =
    item.type === "folder"
      ? params?.folderId === item._id
      : params?.fileId === item._id;

  const handleClick = () => {
    if (item.type === "folder") {
      setIsExpanded(!isExpanded);
      navigate(`/fileExplorer/folder/${item._id}`);
    } else {
      navigate(`/fileExplorer/file/${item._id}`);
    }
  };

  const handleDeleteItem = (e) => {
    e.preventDefault();

    const isFolder = item.type === "folder";
    const id = item._id;
    const parent = item?.parentFolder;

    if (isFolder) {
      deleteFolder(
        { folderId: id },
        {
          onSuccess: () => {
            toast.success("Folder deleted successfully");

            if (parent)
              queryClient.invalidateQueries({ queryKey: ["folder", parent] });
            else queryClient.invalidateQueries({ queryKey: ["fileExplorer"] });
          },
          onError: (err) => {
            toast.error(err.message);
          },
        }
      );
    } else {
      deleteFile(
        { fileId: id },
        {
          onSuccess: () => {
            toast.success("File deleted successfully");

            if (parent)
              queryClient.invalidateQueries({ queryKey: ["folder", parent] });
            else queryClient.invalidateQueries({ queryKey: ["fileExplorer"] });
          },
          onError: (err) => {
            toast.error(err.message);
          },
        }
      );
    }
  };

  return (
    <div className="mb-1 overflow-y-auto overflow-x-hidden">
      <div
        className={`
          flex items-center justify-between px-3 py-2 rounded-lg transition-all duration-200
          ${isActive ? "bg-blue-100 text-blue-800" : "hover:bg-gray-100"}
          ${isHovered ? "shadow-md" : ""}
        `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-disabled={true}
      >
        <div
          className={`flex items-center space-x-2  ${
            isDeletingFolder ? "cursor-wait" : "cursor-pointer"
          } `}
          onClick={handleClick}
        >
          {item.type === "folder" && (
            <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
              {isExpanded ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronRight size={16} />
              )}
            </button>
          )}
          {item.type === "folder" ? (
            <Folder size={14} className="text-yellow-500" />
          ) : (
            <File size={14} className="text-blue-500" />
          )}
          <p
            className={`text-sm ${
              isActive ? "font-semibold" : "font-medium"
            } truncate max-w-[70px]`}
          >
            {item.type === "folder" ? item.folderName : item.fileName}
          </p>
        </div>
        <div
          className={`flex items-center space-x-1 transition-opacity duration-200 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          {item.type === "folder" && (
            <>
              <button
                onClick={() => {
                  setNewFileFolderDialog(true);
                  setNewFileOrFolder("file");
                  setMode("create");
                }}
                className="p-1 text-gray-500 hover:text-blue-600 rounded-full hover:bg-blue-100 transition-colors duration-200"
                title="Add file"
              >
                <Plus size={14} />
              </button>
              <button
                onClick={() => {
                  setNewFileFolderDialog(true);
                  setNewFileOrFolder("folder");
                  setMode("create");
                }}
                className="p-1 text-gray-500 hover:text-green-600 rounded-full hover:bg-green-100 transition-colors duration-200"
                title="Add folder"
              >
                <Folder size={14} />
              </button>
            </>
          )}
          <button
            onClick={() => {
              setNewFileFolderDialog(true);
              setNewFileOrFolder(item.type);
              setMode("edit");
            }}
            className="p-1 text-green-500 rounded-full bg-green-300 transition-colors duration-200"
            title="Edit"
          >
            <Edit size={14} />
          </button>
          <button
            onClick={(e) => handleDeleteItem(e)}
            className="p-1 text-red-500 hover:text-red-600 rounded-full bg-red-200 transition-colors duration-200"
            title="Delete"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
      {item.type === "folder" && isExpanded && (
        <div className="pl-3 mt-1">
          <div className="text-sm text-gray-500 italic">
            {contents?.items?.map((content) => (
              <FileAndFolder item={content} key={content._id} />
            ))}
          </div>
        </div>
      )}

      {newFileFolderDialog && (
        <AddFileOrFolder
          item={item}
          mode={mode}
          isFolder={newFileOrFolder === "folder"}
          isOpen={newFileFolderDialog}
          onClose={setNewFileFolderDialog}
        />
      )}
    </div>
  );
}
