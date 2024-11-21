/* eslint-disable react/prop-types */

import { toast } from "sonner";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "../ui/context-menu";
import {
  ChevronDown,
  ChevronRight,
  File,
  FolderOpen,
  Pencil,
} from "lucide-react";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { Input } from "../ui/input";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";

import { Button } from "../ui/button";
import { useQueryClient } from "@tanstack/react-query";
import {
  useCreateNewFile,
  useDeleteFile,
  useRenameFile,
} from "../../hooks/fileExplorer/useFile";
import {
  useCreateNewFolder,
  useDeleteFolder,
  useGetFolder,
  useRenameFolder,
} from "../../hooks/fileExplorer/useFolder";
import ConfirmDeleteDialog from "../ConfirmDeleteDialog";

function FolderOrFile({ folder }) {
  const [deleteFileFolder, setDeleteFileFolder] = useState(false);
  const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null,
  });

  const [rename, setRename] = useState({
    visible: false,
    isFolder: null,
  });

  const { deleteFolder, isDeletingFolder } = useDeleteFolder();
  const { deleteFile } = useDeleteFile();

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { createNewFolder } = useCreateNewFolder();
  const { createNewFile } = useCreateNewFile();
  const { renameFolder, isRenamingFolder } = useRenameFolder();
  const { renameFile, isRenamingFile } = useRenameFile();
  const { data: contents } = useGetFolder(
    expand && folder.type === "folder" ? folder._id : null
  );
  const params = useParams();

  // add new file or folder
  function handleNewFileOrFolder(e, isFolder) {
    e.stopPropagation();
    setExpand(true);
    setShowInput({
      visible: true,
      isFolder: isFolder,
    });
  }

  async function onAddFileOrFolder(e) {
    if (e.keyCode === 13 && e.target.value) {
      // Fetch existing contents (folders and files)
      const existingItems = folder?.items || [];

      // Check if a folder/file with the same name already exists
      const duplicate = existingItems?.some((item) =>
        item.type === "folder"
          ? item.folderName.toLowerCase() ===
            e.target.value.trim().toLowerCase()
          : item.fileName.toLowerCase() === e.target.value.trim().toLowerCase()
      );

      if (duplicate) {
        toast.error("A file or folder with this name already exists.");
        return;
      }

      if (showInput.isFolder) {
        const newData = {
          folderName: e.target.value,
          parentFolder: folder?._id ? folder._id : null,
        };

        createNewFolder(
          { newData },
          {
            onSuccess: () => {
              toast.success("Folder created successfully");
              queryClient.invalidateQueries({
                queryKey: ["folder", folder?._id],
              });
            },
            onError: (error) => {
              toast.error(error.message);
            },
          }
        );
      } else {
        const newData = {
          fileName: e.target.value,
          parentFolder: folder?._id ? folder._id : null,
        };

        createNewFile(
          { newData },
          {
            onSuccess: () => {
              toast.success("File created successfully");
              queryClient.invalidateQueries({
                queryKey: ["folder", folder?._id],
              });
            },
            onError: (error) => {
              toast.error(error.message);
            },
          }
        );
      }

      setShowInput({ ...showInput, visible: false });
    }
  }

  // rename new file or folder
  function handleRename(e, isFolder) {
    e.stopPropagation();
    setExpand(true);

    console.error("isFolder = ", isFolder);

    setRename({
      visible: true,
      isFolder: isFolder,
    });
  }

  function onRenameFileOrFolder(e) {
    if (e.keyCode === 13 && e.target.value) {
      const existingItems = folder?.items || [];

      const name = e.target.value.trim();

      // Check if a folder/file with the same name already exists
      const duplicate = existingItems?.some((item) =>
        item.type === "folder"
          ? item.folderName.toLowerCase() === name.toLowerCase()
          : item.fileName.toLowerCase() === name.toLowerCase()
      );

      if (duplicate) {
        toast.error("A file or folder with this name already exists.");
        return;
      }

      if (rename.isFolder) {
        const newName = e.target.value;
        const folderId = folder._id;

        renameFolder(
          { newName, folderId },
          {
            onSuccess: () => {
              toast.success("Folder renamed successfully");

              if (folder?.parentFolder) {
                console.error(folder?._id);
                queryClient.invalidateQueries({
                  queryKey: ["folder", folder?.parentFolder],
                });
              } else {
                queryClient.invalidateQueries({ queryKey: ["fileExplorer"] });
              }
            },
            onError: (error) => {
              toast.error(error.message);
            },
          }
        );
      } else {
        const fileName = e.target.value;
        const fileId = folder._id;

        renameFile(
          { fileName, fileId },
          {
            onSuccess: () => {
              toast.success("File renamed successfully");
              if (folder?.parentFolder) {
                console.error(folder?._id);
                queryClient.invalidateQueries({
                  queryKey: ["folder", folder?.parentFolder],
                });
              } else {
                queryClient.invalidateQueries({ queryKey: ["fileExplorer"] });
              }
            },
            onError: (error) => {
              toast.error(error.message);
            },
          }
        );
      }
      setRename({ ...rename, visible: false });
    }
  }

  // delete file and folder
  const handleDeleteFileOrFolder = (e) => {
    e.preventDefault();

    const isFolder = folder.type === "folder";
    const id = folder._id;
    const parent = folder?.parentFolder;

    if (isFolder) {
      deleteFolder(
        { folderId: id },
        {
          onSuccess: () => {
            toast.success("Folder deleted successfully");
            setDeleteFileFolder(false);

            if (parent)
              queryClient.invalidateQueries({ queryKey: ["folder", parent] });
            else queryClient.invalidateQueries({ queryKey: ["fileExplorer"] });
          },
          onError: (err) => {
            setDeleteFileFolder(false);
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
            setDeleteFileFolder(false);

            if (parent)
              queryClient.invalidateQueries({ queryKey: ["folder", parent] });
            else queryClient.invalidateQueries({ queryKey: ["fileExplorer"] });
          },
          onError: (err) => {
            setDeleteFileFolder(false);
            toast.error(err.message);
          },
        }
      );
    }
  };

  return (
    <div className="w-full max-w-full overflow-y-auto px-2">
      <ContextMenu>
        <ContextMenuTrigger>
          {folder?.type === "folder" ? (
            <>
              <div
                onClick={() => {
                  setExpand(!expand);
                  navigate(`/fileExplorer/folder/${folder?._id}`);
                }}
                className={`${
                  params?.folderId === folder?._id
                    ? "text-green-500 bg-green-200"
                    : "text-gray-500 hover:bg-gray-300"
                } flex gap-2  font-semibold text-sm capitalize cursor-pointer p-2  my-2 rounded-md `}
              >
                {expand ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}

                {rename.visible ? (
                  <div className="flex gap-2 items-center">
                    <span>
                      {showInput.isFolder && (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </span>
                    <Input
                      type="text"
                      defaultValue={folder.folderName}
                      className="bg-gray-100"
                      onKeyDown={onRenameFileOrFolder}
                    />
                  </div>
                ) : (
                  <p className="truncate max-w-full">{folder?.folderName}</p>
                )}
              </div>
              <div className={`${expand ? "block" : "hidden"} pl-6`}>
                {showInput.visible && (
                  <div className="flex gap-2 items-center">
                    <span>
                      {showInput.isFolder && (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </span>
                    <Input
                      type="text"
                      placeholder="Name...."
                      defaultValue={folder?.folderName}
                      disabled={isRenamingFolder}
                      className="bg-gray-100"
                      onKeyDown={onAddFileOrFolder}
                    />
                  </div>
                )}
                {contents?.items?.map((item) => {
                  return <FolderOrFile folder={item} key={item._id} />;
                })}
              </div>
            </>
          ) : (
            <div
              className={`${
                params?.fileId === folder?._id
                  ? "text-green-500 bg-green-200"
                  : "text-gray-500 hover:bg-gray-300 bg-gray-100"
              } font-semibold text-sm p-2  my-2 rounded-md cursor-pointer`}
              onClick={() => {
                navigate(`/fileExplorer/file/${folder?._id}`);
              }}
            >
              {rename.visible ? (
                <div className="flex gap-2 items-center">
                  <span>
                    {showInput.isFolder ? (
                      <ChevronRight className="w-4 h-4" />
                    ) : (
                      <File className="w-4 h-4" />
                    )}
                  </span>
                  <Input
                    type="text"
                    defaultValue={folder?.fileName}
                    disabled={isRenamingFile}
                    className="bg-gray-100"
                    onKeyDown={onRenameFileOrFolder}
                  />
                </div>
              ) : (
                <div className="flex gap-2 items-center overflow-hidden">
                  <File className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate flex-grow-0">
                    {folder?.fileName}
                  </span>
                </div>
              )}
            </div>
          )}
        </ContextMenuTrigger>
        <ContextMenuContent className="">
          {folder?.type === "folder" && (
            <ContextMenuItem
              inset
              className="flex gap-4"
              onClick={(e) => handleNewFileOrFolder(e, true)}
            >
              <FolderOpen className="w-4 h-4" />
              <span> New Folder</span>
            </ContextMenuItem>
          )}

          {folder?.type === "folder" && (
            <ContextMenuItem
              inset
              className="flex gap-4"
              onClick={(e) => handleNewFileOrFolder(e, false)}
            >
              <Pencil2Icon className="w-4 h-4" />
              <span> New Note</span>
            </ContextMenuItem>
          )}

          {folder?.type === "folder" && <ContextMenuSeparator />}

          <ContextMenuItem
            className="flex items-center justify-center"
            onClick={(e) =>
              handleRename(e, folder?.type === "folder" ? true : false)
            }
          >
            <Button className="flex gap-3">
              <Pencil className="w-4 h-4" /> Rename
            </Button>
          </ContextMenuItem>

          <ContextMenuSeparator />

          <ContextMenuItem className="flex items-center justify-center">
            <ConfirmDeleteDialog
              onClose={setDeleteFileFolder}
              open={deleteFileFolder}
              isPending={isDeletingFolder}
              handleDelete={handleDeleteFileOrFolder}
              message="Once deleted the label cannot be recovered"
            />
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  );
}

export default FolderOrFile;
