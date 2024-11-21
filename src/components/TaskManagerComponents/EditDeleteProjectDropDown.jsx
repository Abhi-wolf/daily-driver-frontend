/* eslint-disable react/prop-types */

import { EllipsisVertical } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useState } from "react";
import { useDeleteProject } from "../../hooks/project/useDeleteProject";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import AddOrEditProjectModel from "./AddOrEditProjectModel";
import { useGetProject } from "../../hooks/project/useGetProject";
import ConfirmDeleteDialog from "../ConfirmDeleteDialog";

function EditDeleteProjectDropDown({ projectId }) {
  const [openConfirmDeleteDialog, setOpenConfirmDeleteDialog] = useState(false);
  const { deleteProject, isPending } = useDeleteProject();
  const { project } = useGetProject();
  const navigate = useNavigate();

  const handleDeleteProject = async () => {
    try {
      deleteProject(
        { projectId },
        {
          onSuccess: () => {
            toast.success("Project successfully deleted");
          },
          onError: (error) => {
            toast.error(error?.message);
          },
        }
      );
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setOpenConfirmDeleteDialog(false);
      navigate("/tasksmanager");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col gap-2 p-4">
        <ConfirmDeleteDialog
          onClose={setOpenConfirmDeleteDialog}
          open={openConfirmDeleteDialog}
          isPending={isPending}
          handleDelete={handleDeleteProject}
          message="Once deleted the project cannot be recovered"
        />
        <AddOrEditProjectModel
          mode="edit"
          projectId={projectId}
          projectDescription={project?.projectDescription}
          projectName={project?.projectName}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default EditDeleteProjectDropDown;
