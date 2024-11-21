/* eslint-disable react/prop-types */
import { FileIcon } from "lucide-react";
import { MediumSpinner } from "../Spinners";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import {
  useGetDeletedFiles,
  usePermanentDeleteFile,
  useRestoreFile,
} from "../../hooks/fileExplorer/useFile";
import { useQueryClient } from "@tanstack/react-query";

function DeletedFiles({ setIsRecycleBinEmpty }) {
  const { deletedFiles, isPending } = useGetDeletedFiles();
  const { restoreFile, isRestoringFile } = useRestoreFile();
  const { permanentDeleteFile, isDeletingFile } = usePermanentDeleteFile();
  const queryClient = useQueryClient();

  const handleRestore = (fileId) => {
    restoreFile(
      { fileId },
      {
        onSuccess: () => {
          toast.success("File restored successfully");
          queryClient.invalidateQueries({ queryKey: ["deletedFiles"] });
        },
        onError: () => {
          toast.error("Something went wrong");
        },
      }
    );
  };

  const handlePermanentDelete = (fileId) => {
    if (!fileId) return;

    permanentDeleteFile(
      { fileId },
      {
        onSuccess: () => {
          toast.success("Folder deleted successfully");
          queryClient.invalidateQueries({
            queryKey: ["deletedFolders", "deletedFiles"],
          });
        },
        onError: () => {
          toast.error("Something went wrong");
        },
      }
    );
  };

  if (isPending) return <MediumSpinner />;

  if (deletedFiles?.length === 0) {
    setIsRecycleBinEmpty(true);
    return;
  } else {
    setIsRecycleBinEmpty(false);
  }

  return (
    <div className="flex gap-4">
      {deletedFiles.map(
        (item) =>
          item.type === "file" && (
            <DropdownMenu key={item._id}>
              <DropdownMenuTrigger asChild>
                <div
                  key={item._id}
                  className="flex flex-col justify-center items-center gap-1 w-40 h-40 rounded-lg cursor-pointer hover:border-4 border-gray-300 bg-gray-100"
                >
                  <FileIcon className="w-24 h-24" />
                  <p className="text-center text-gray-400 font-semibold overflow-y-hidden">
                    {item?.fileName}
                  </p>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 p-4">
                <DropdownMenuItem
                  className="cursor-pointer "
                  onClick={() => handleRestore(item._id)}
                  disabled={isDeletingFile || isRestoringFile}
                >
                  Restore
                </DropdownMenuItem>
                <DropdownMenuSeparator />

                <DropdownMenuItem className="cursor-pointer">
                  Properties
                </DropdownMenuItem>
                <DropdownMenuSeparator />

                <DropdownMenuItem>
                  <Button
                    variant="destructive"
                    className="w-full"
                    onClick={() => handlePermanentDelete(item._id)}
                    disabled={isDeletingFile || isRestoringFile}
                  >
                    Delete Permanently
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </DropdownMenuContent>
            </DropdownMenu>
          )
      )}
    </div>
  );
}

export default DeletedFiles;
