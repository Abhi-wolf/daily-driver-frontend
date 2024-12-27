/* eslint-disable react/prop-types */
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Edit,
  Copy,
  Globe,
  Star,
  CalendarCheck,
  EllipsisVertical,
} from "lucide-react";
import ConfirmDeleteDialog from "../ConfirmDeleteDialog";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Button } from "../ui/button";
import AddOrEditBookMark from "./AddOrEditBookMark";
import { useDeleteBookmark } from "../../hooks/useBookmark";
import { toast } from "sonner";
import { convertToISOFormat } from "../../lib/utils";

export default function BookmarkItem({ bookmark }) {
  const { deleteBookmark, isDeletingBookmark } = useDeleteBookmark();
  const [isOpenConfirmDeleteDialog, setIsOpenConfirmDeleteDialog] =
    useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(bookmark?.url);
    setCopied(true);
    toast.success("URL copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDeleteBookMark = async () => {
    deleteBookmark(
      { bookmarkId: bookmark._id },
      {
        onSuccess: () => {
          toast.success("Bookmark deleted successfully");
          setIsOpenConfirmDeleteDialog(false);
        },
        onError: (err) => {
          toast.error(err?.message || "Something went wrong");
        },
      }
    );
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-primary/10 rounded-full">
            <Globe className="w-4 h-4 text-primary" />
          </div>
          <span className="font-semibold line-clamp-1">{bookmark.title}</span>
        </div>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="destructive"
              size="icon"
              className="w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <EllipsisVertical className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="flex flex-col gap-2">
            <AddOrEditBookMark bookmark={bookmark}>
              <Button className="w-full" variant="outline">
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
            </AddOrEditBookMark>
            <ConfirmDeleteDialog
              open={isOpenConfirmDeleteDialog}
              onClose={setIsOpenConfirmDeleteDialog}
              handleDelete={handleDeleteBookMark}
              isPending={isDeletingBookmark}
            />
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <a
              href={bookmark.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-primary truncate max-w-[200px]"
            >
              {bookmark.url}
            </a>
            <Button
              variant="outline"
              size="icon"
              onClick={handleCopy}
              className={`w-8 h-8 transition-colors ${
                copied ? "bg-green-100 text-green-600" : ""
              }`}
            >
              {copied ? "✓" : <Copy className="w-4 h-4" />}
            </Button>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500" />
              <span className="font-medium">
                {bookmark?.category || "Uncategorized"}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <CalendarCheck className="w-4 h-4 text-blue-500" />
              <span className="font-medium">
                {convertToISOFormat(bookmark.createdAt)}
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {bookmark?.labels?.map((label, index) => (
              <Badge key={index} variant="secondary">
                {label}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
