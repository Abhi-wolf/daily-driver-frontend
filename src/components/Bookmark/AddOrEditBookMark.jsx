/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAddBookmark, useUpdateBookmark } from "../../hooks/useBookmark";
import { toast } from "sonner";

function AddOrEditBookMark({ bookmark, children }) {
  const { addBookmark, isAddingBookmark } = useAddBookmark();
  const { updateBookmark, isUpdatingBookmark } = useUpdateBookmark();
  const [isOpen, onClose] = useState(false);
  const [newLabel, setNewLabel] = useState("");

  const {
    handleSubmit,
    register,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: bookmark?.title || "",
      url: bookmark?.url || "",
      category: bookmark?.category || "",
      labels: bookmark?.labels || [],
    },
  });

  const labels = watch("labels");

  const handleAddBookmark = async (newBookmark) => {
    console.log("Bookmark newBookmark:", newBookmark);
    if (!bookmark) {
      try {
        addBookmark(
          { newBookmark },
          {
            onSuccess: () => {
              toast.success("Bookmark added successfully");
            },
            onError: (err) => {
              console.error(err.message);
              toast.error(err?.message || "Something went wrong");
            },
          }
        );
      } catch (error) {
        console.error(error);
      } finally {
        onClose(false);
      }
    } else {
      try {
        updateBookmark(
          { bookmarkId: bookmark._id, newBookmark },
          {
            onSuccess: () => {
              toast.success("Bookmark updated successfully");
            },
            onError: (err) => {
              console.error(err.message);
              toast.error(err?.message || "Something went wrong");
            },
          }
        );
      } catch (error) {
        console.error(error);
      } finally {
        onClose(false);
      }
    }
  };

  const handleAddLabel = (e) => {
    e.preventDefault();
    const currentLabels = getValues("labels") || [];

    if (
      newLabel &&
      !currentLabels?.some(
        (lbl) => lbl.toLowerCase() === newLabel.toLowerCase()
      )
    ) {
      const updatedLabels = [...currentLabels, newLabel];
      setValue("labels", updatedLabels);
      setNewLabel("");
    }
  };

  const handleRemoveLabel = (index) => (e) => {
    e.preventDefault();
    const currentLabels = getValues("labels") || [];
    console.log("CURRENT LABELS = ", currentLabels);

    const updatedLabels = currentLabels.filter((_, i) => i !== index);

    console.log("UPDATED LABELS = ", updatedLabels);
    setValue("labels", updatedLabels);
  };

  return (
    <Dialog modal onOpenChange={onClose} open={isOpen} defaultOpen={false}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Bookmark</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleAddBookmark)} className="space-y-4">
          <div>
            <Label htmlFor="title">Bookmark Title</Label>
            <Input
              id="title"
              placeholder="Enter bookmark title"
              {...register("title", { required: "Bookmark title is required" })}
            />
            {errors.title && (
              <p className="text-red-500 text-xs">{errors.title.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="url">Bookmark URL</Label>
            <Input
              id="url"
              placeholder="Enter bookmark URL"
              {...register("url", { required: "Bookmark URL is required" })}
            />
            {errors.url && (
              <p className="text-red-500 text-xs">{errors.url.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="category">Bookmark Category</Label>
            <Input
              id="category"
              placeholder="Enter bookmark category"
              {...register("category")}
            />
          </div>
          <div>
            <Label htmlFor="labels">Bookmark Labels</Label>
            <div className="flex gap-2">
              <Input
                id="labels"
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value)}
                placeholder="Add a label"
              />
              <Button type="button" onClick={handleAddLabel}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {getValues("labels")?.map((label, index) => (
                <Badge key={index} variant="secondary">
                  {label}
                  <button
                    onClick={(e) => handleRemoveLabel(index)(e)}
                    className="ml-1 text-xs"
                  >
                    ×
                  </button>
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              className="bg-gray-200"
              onClick={(e) => {
                e.preventDefault();
                onClose(false);
              }}
              disabled={isAddingBookmark || isUpdatingBookmark}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={isAddingBookmark || isUpdatingBookmark}
            >
              Save Bookmark
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddOrEditBookMark;
