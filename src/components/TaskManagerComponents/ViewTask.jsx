/* eslint-disable react/prop-types */
import {
  Calendar,
  CheckCircle,
  Clock,
  Edit,
  Flag,
  Home,
  View,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

import { Badge } from "../ui/badge";
import { useState } from "react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

function ViewTask({ todo }) {
  const [isOpen, onClose] = useState(false);
  console.info(todo);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Dialog onOpenChange={onClose} open={isOpen} modal defaultOpen={false}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full my-2 flex gap-2 bg-gray-100"
        >
          <View className="w-4 h-4" /> View Task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] p-0 overflow-hidden bg-gradient-to-br from-white to-gray-50 transition-all duration-300 ease-in-out">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-2xl font-bold mb-2">
            Task Details
          </DialogTitle>
        </DialogHeader>
        <div className="px-4 py-2 space-y-4">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-primary">
              {todo?.todoName}
            </h3>
            <p className="text-muted-foreground">{todo?.todoDescription}</p>
          </div>
          <Separator />
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className="bg-primary/10 text-primary transition-colors duration-200 hover:bg-primary/20"
              >
                <Home className="w-3 h-3 mr-1" />
                {todo?.label}
              </Badge>
            </div>
            <div className={`flex items-center gap-2 `}>
              <Badge
                variant={todo?.done ? "success" : "secondary"}
                className={`transition-colors duration-200 ${
                  todo?.done ? "bg-yellow-400" : "bg-green-400"
                }`}
              >
                <CheckCircle className="w-3 h-3 mr-1" />
                {todo?.done ? "Completed" : "Pending"}
              </Badge>
            </div>
            <div className="flex items-center gap-1 text-purple-600">
              <Calendar className="w-3 h-3 text-primary" />
              <span className="text-sm">Due: {formatDate(todo?.dueDate)}</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Flag
                className={`w-3 h-3 ${
                  todo?.priority ? "text-red-500" : " text-yellow-500"
                }`}
              />
              <span
                className={`text-sm ${
                  todo?.priority
                    ? "text-red-500 font-semibold"
                    : "text-yellow-500"
                }`}
              >
                {todo?.priority ? "High Priority" : "Low Priority"}
              </span>
            </div>
          </div>
          <Separator />
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              <span>Created: {formatDate(todo?.createdAt)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Edit className="w-4 h-4 text-primary" />
              <span>Updated: {formatDate(todo?.updatedAt)}</span>
            </div>
          </div>
        </div>
        <div className="p-2 bg-muted/50 flex justify-end">
          <Button
            onClick={() => onClose(false)}
            className="transition-all duration-200 hover:shadow-md"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ViewTask;
