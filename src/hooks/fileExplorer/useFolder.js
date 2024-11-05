import { useMutation, useQuery } from "@tanstack/react-query";
import {
  deleteFolder as deleteFolderApi,
  createNewFolder as createNewFolderApi,
  getFolder,
  renameFolder as renameFolderApi,
  restoreFolder as restoreFolderApi,
  permanentDeleteFolder as permanentDeleteFolderApi,
} from "../../features/apiFolder";

export function useGetFolder(folderId) {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["folder", folderId],
    queryFn: () => getFolder(folderId),
    enabled: !!folderId,
  });

  return { data, isPending, isError, error };
}

export function useDeleteFolder() {
  const { mutate: deleteFolder, isPending: isDeletingFolder } = useMutation({
    mutationFn: deleteFolderApi,
  });

  return { deleteFolder, isDeletingFolder };
}

export function useCreateNewFolder() {
  const { mutate: createNewFolder, isPending: isCreatingNewFolder } =
    useMutation({
      mutationFn: createNewFolderApi,
    });

  return { createNewFolder, isCreatingNewFolder };
}

export function useRenameFolder() {
  const { mutate: renameFolder, isPending: isRenamingFolder } = useMutation({
    mutationFn: renameFolderApi,
  });

  return { renameFolder, isRenamingFolder };
}

export function useRestoreFolder() {
  const { mutate: restoreFolder, isPending: isRestoringFolder } = useMutation({
    mutationFn: restoreFolderApi,
  });

  return { restoreFolder, isRestoringFolder };
}

export function usePermanentDeleteFolder() {
  const { mutate: permanentDeleteFolder, isPending: isDeletingFolder } =
    useMutation({
      mutationFn: permanentDeleteFolderApi,
    });

  return { permanentDeleteFolder, isDeletingFolder };
}
