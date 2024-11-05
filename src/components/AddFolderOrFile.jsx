/* eslint-disable react/prop-types */
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useGetUserFileExplorer } from "../hooks/fileExplorer/useGetFileExplorer";
import { useCreateNewFile } from "../hooks/fileExplorer/useFile";
import { useCreateNewFolder } from "../hooks/fileExplorer/useFolder";

function AddFileOrFolder({ isOpen, onClose, isFolder }) {
  const queryClient = useQueryClient();
  const { createNewFolder, isCreatingNewFolder } = useCreateNewFolder();
  const { createNewFile, isCreatingNewFile } = useCreateNewFile();
  const { data: explorerData } = useGetUserFileExplorer();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (newData) => {
    // Fetch existing contents (folders and files)
    const existingItems = explorerData || [];

    // Check if a folder/file with the same name already exists
    let duplicate;
    if (isFolder) {
      duplicate = existingItems?.some((item) =>
        item.type === "folder"
          ? item.folderName.toLowerCase() === newData.folderName.toLowerCase()
          : item.fileName.toLowerCase() === newData.folderName.toLowerCase()
      );
    } else {
      duplicate = existingItems?.some((item) =>
        item.type === "folder"
          ? item.folderName.toLowerCase() === newData.fileName.toLowerCase()
          : item.fileName.toLowerCase() === newData.fileName.toLowerCase()
      );
    }

    if (duplicate) {
      toast.error("A file or folder with this name already exists.");
      return;
    }

    try {
      newData = { ...newData, parentFolder: null };

      if (isFolder) {
        createNewFolder(
          { newData },
          {
            onSuccess: () => {
              toast.success("Folder created successfully");
              onClose(false);
              queryClient.invalidateQueries({ queryKey: ["fileExplorer"] });
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
              queryClient.invalidateQueries({ queryKey: ["fileExplorer"] });
            },
            onError: (error) => {
              toast.error(error.message);
            },
          }
        );
      }
    } catch (error) {
      console.log("AddFileOrFolder error = ", error);
    }
  };

  return (
    <Dialog onOpenChange={onClose} open={isOpen} modal defaultOpen={false}>
      <DialogContent className="sm:max-w-[425px] p-8">
        <DialogHeader>
          <DialogTitle>
            Create a new {isFolder ? "folder" : "file"}{" "}
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
              disabled={isCreatingNewFile || isCreatingNewFolder}
              {...register(isFolder ? "folderName" : "fileName", {
                required: true,
              })}
            />

            {errors.name && (
              <span className="text-red-400 my-1">Name is required.</span>
            )}
          </div>
          <Button
            type="submit"
            disabled={isCreatingNewFile || isCreatingNewFolder}
          >
            Save changes
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddFileOrFolder;
