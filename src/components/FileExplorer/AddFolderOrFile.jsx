/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useGetUserFileExplorer } from "../../hooks/fileExplorer/useGetFileExplorer";
import {
  useCreateNewFile,
  useRenameFile,
} from "../../hooks/fileExplorer/useFile";
import {
  useCreateNewFolder,
  useRenameFolder,
} from "../../hooks/fileExplorer/useFolder";

function AddFileOrFolder({ item, isOpen, onClose, isFolder, mode = "create" }) {
  const queryClient = useQueryClient();
  const { createNewFolder, isCreatingNewFolder } = useCreateNewFolder();
  const { createNewFile, isCreatingNewFile } = useCreateNewFile();
  const { renameFolder, isRenamingFolder } = useRenameFolder();
  const { renameFile, isRenamingFile } = useRenameFile();
  const { data: explorerData } = useGetUserFileExplorer();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      folderName: mode === "edit" && isFolder && item ? item.folderName : "",
      fileName: mode === "edit" && !isFolder && item ? item.fileName : "",
    },
  });

  const isDisable = () => {
    return (
      isCreatingNewFile ||
      isCreatingNewFolder ||
      isRenamingFile ||
      isRenamingFolder
    );
  };

  const handleCreateNewFileFolder = async (newData) => {
    try {
      newData = { ...newData, parentFolder: item ? item._id : null };

      if (isFolder) {
        createNewFolder(
          { newData },
          {
            onSuccess: () => {
              toast.success("Folder created successfully");
              onClose(false);
              if (item) {
                queryClient.invalidateQueries({
                  queryKey: ["folder", item._id],
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
        createNewFile(
          { newData },
          {
            onSuccess: () => {
              toast.success("File created successfully");
              onClose(false);
              if (item) {
                queryClient.invalidateQueries({
                  queryKey: ["folder", item._id],
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
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleRenameFileFolder = async (newData) => {
    const newName = isFolder ? newData.folderName : newData.fileName;
    console.log("newData = ", newData);

    try {
      if (isFolder) {
        renameFolder(
          { newName, folderId: item._id },
          {
            onSuccess: () => {
              toast.success("Folder renamed successfully");
              onClose(false);
              if (item?.parentFolder) {
                queryClient.invalidateQueries({
                  queryKey: ["folder", item?.parentFolder],
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
        renameFile(
          { newName, fileId: item._id },
          {
            onSuccess: () => {
              toast.success("File renamed successfully");
              if (item?.parentFolder) {
                onClose(false);
                queryClient.invalidateQueries({
                  queryKey: ["folder", item?.parentFolder],
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
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async (newData) => {
    // Fetch existing contents (folders and files)
    const existingItems = explorerData || [];

    // Check if a folder/file with the same name already exists
    let duplicate;
    if (isFolder) {
      duplicate = existingItems?.some((fol) =>
        fol.type === "folder"
          ? fol.folderName.toLowerCase() === newData.folderName.toLowerCase()
          : fol.fileName.toLowerCase() === newData.folderName.toLowerCase()
      );
    } else {
      duplicate = existingItems?.some((file) =>
        file.type === "folder"
          ? file.folderName.toLowerCase() === newData.fileName.toLowerCase()
          : file.fileName.toLowerCase() === newData.fileName.toLowerCase()
      );
    }

    if (duplicate) {
      toast.error("A file or folder with this name already exists.");
      return;
    } else if (mode === "create") {
      await handleCreateNewFileFolder(newData);
    } else if (mode === "edit" && item) {
      await handleRenameFileFolder(newData);
    }
  };

  return (
    <Dialog onOpenChange={onClose} open={isOpen} modal defaultOpen={false}>
      <DialogContent className="sm:max-w-[425px] p-8">
        <DialogHeader>
          <DialogTitle>
            {mode === "create"
              ? `Create a new ${isFolder ? "folder" : "file"}`
              : `Rename ${isFolder ? "folder" : "file"}`}
          </DialogTitle>
          <DialogDescription>
            This new {isFolder ? "folder" : "file"} will be created in the root
            folder. To create a {isFolder ? "folder" : "file"} in a specfic
            folder right click on that folder.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 "
        >
          <div className="flex flex-col  gap-4">
            <Label htmlFor="name" className="text-left capitalize">
              {isFolder ? "folder" : "file"} name
            </Label>
            <Input
              id={isFolder ? "folderName" : "fileName"}
              className="col-span-3"
              disabled={isDisable}
              {...register(isFolder ? "folderName" : "fileName", {
                required: true,
              })}
            />

            {errors.name && (
              <span className="text-red-400 my-1">Name is required.</span>
            )}
          </div>
          <Button type="submit" disabled={isDisable}>
            Save changes
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddFileOrFolder;
