import { useMutation, useQuery } from "@tanstack/react-query";
import {
  deleteFile as deleteFileApi,
  getDeletedFiles,
  getFile,
  restoreFile as restoreFileApi,
  updateFile,
  createNewFile as createNewFileApi,
  permanentDeleteFile as permanentDeleteFileApi,
} from "../../features/apiFile";

export function useDeleteFile() {
  const { mutate: deleteFile, isPending: isDeletingFile } = useMutation({
    mutationFn: deleteFileApi,
  });

  return { deleteFile, isDeletingFile };
}

export function useRestoreFile() {
  const { mutate: restoreFile, isPending: isRestoringFile } = useMutation({
    mutationFn: restoreFileApi,
  });

  return { restoreFile, isRestoringFile };
}

export function useGetFile(fileId) {
  const {
    data: file,
    error,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["file", fileId],
    queryFn: () => getFile(fileId),
    enabled: !!fileId,
  });

  return { file, isPending, isError, error };
}

export function useGetDeletedFiles() {
  const { data: deletedFiles, isPending } = useQuery({
    queryKey: ["deletedFiles"],
    queryFn: () => getDeletedFiles(),
  });

  return { deletedFiles, isPending };
}

export function useRenameFile() {
  const { mutate: renameFile, isPending: isRenamingFile } = useMutation({
    mutationFn: updateFile,
  });

  return { renameFile, isRenamingFile };
}

export function useFileUpdateContent() {
  const { mutate: updateFileContent, isPending: isUpdatingFileContent } =
    useMutation({
      mutationFn: updateFile,
    });

  return { updateFileContent, isUpdatingFileContent };
}

export function useCreateNewFile() {
  const { mutate: createNewFile, isPending: isCreatingNewFile } = useMutation({
    mutationFn: createNewFileApi,
  });

  return { createNewFile, isCreatingNewFile };
}

export function usePermanentDeleteFile() {
  const { mutate: permanentDeleteFile, isPending: isDeletingFile } =
    useMutation({
      mutationFn: permanentDeleteFileApi,
    });

  return { permanentDeleteFile, isDeletingFile };
}
