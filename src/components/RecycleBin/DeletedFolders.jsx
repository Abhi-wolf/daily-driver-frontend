/* eslint-disable react/prop-types */
import { Folder } from "lucide-react";
import { useGetDeletedFolders } from "../../hooks/recycleBin/useGetDeletedFolders";
import { MediumSpinner } from "../Spinners";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import {
  usePermanentDeleteFolder,
  useRestoreFolder,
} from "../../hooks/fileExplorer/useFolder";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

function DeletedFolders({ setIsRecycleBinEmpty }) {
  const queryClient = useQueryClient();
  const { deletedFolders, isPending } = useGetDeletedFolders();
  const { restoreFolder, isRestoringFolder } = useRestoreFolder();
  const { permanentDeleteFolder, isDeletingFolder } =
    usePermanentDeleteFolder();

  const handleRestore = (folderId) => {
    if (!folderId) return;

    restoreFolder(
      { folderId },
      {
        onSuccess: () => {
          toast.success("Folder restored successfully");
          queryClient.invalidateQueries("deletedFolders");
          queryClient.invalidateQueries("deletedFiles");
        },
        onError: () => {
          toast.error("Something went wrong");
        },
      }
    );
  };

  const handlePermanentDelete = (folderId) => {
    if (!folderId) return;

    permanentDeleteFolder(
      { folderId },
      {
        onSuccess: () => {
          toast.success("Folder deleted successfully");
          queryClient.invalidateQueries("deletedFolders");
          queryClient.invalidateQueries("deletedFiles");
        },
        onError: () => {
          toast.error("Something went wrong");
        },
      }
    );
  };

  if (isPending) {
    return <MediumSpinner />;
  }

  if (deletedFolders?.length === 0) {
    setIsRecycleBinEmpty(true);
    return;
  } else {
    setIsRecycleBinEmpty(false);
  }

  return (
    <div className="flex gap-4">
      {deletedFolders?.map(
        (item) =>
          item.type === "folder" && (
            <DropdownMenu key={item._id}>
              <DropdownMenuTrigger asChild>
                <div
                  key={item._id}
                  className="flex flex-col justify-center items-center gap-1 w-40 h-40 rounded-lg cursor-pointer hover:border-4 border-gray-300 bg-gray-100"
                >
                  <Folder className="w-24 h-24" />
                  <p className="text-center text-gray-400 font-semibold">
                    {item?.folderName}
                  </p>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 p-4">
                <DropdownMenuItem
                  className="cursor-pointer "
                  onClick={() => handleRestore(item._id)}
                  disabled={isDeletingFolder || isRestoringFolder}
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
                    disabled={isDeletingFolder || isRestoringFolder}
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

export default DeletedFolders;
