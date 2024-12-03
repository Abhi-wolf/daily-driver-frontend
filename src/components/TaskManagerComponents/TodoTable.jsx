/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  ChevronDown,
  MoreHorizontal,
  PenBoxIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { transformDate } from "../../lib/utils";
import ConfirmDeleteDialog from "../ConfirmDeleteDialog";
import AddOrEditTask from "../AddOrEditTask";
import { toast } from "sonner";
import { useDeleteTodo } from "../../hooks/todos/useDeleteTodo";
import clsx from "clsx";
import { useUpdateTodosStatus } from "../../hooks/todos/useUpdateTodosStatus";
import ViewTask from "./ViewTask";

export const columns = [
  {
    id: "select",
    cell: ({ row }) => {
      const todo = row.original;
      const { updateTodoStatus, isUpdatingTodoStatus } = useUpdateTodosStatus();

      async function handleStatusChange(value) {
        // const done = !todo.done;

        updateTodoStatus(
          { todoId: todo._id, done: value },
          {
            onSuccess: () => {
              toast.success(`Status updated to ${value ? "Done" : "Not Done"}`);
            },
            onError: (err) => {
              toast.error(err?.message);
            },
          }
        );
      }

      return (
        <Checkbox
          checked={todo.done}
          onCheckedChange={(value) => {
            handleStatusChange(value);
          }}
          aria-label="Select row"
          disabled={isUpdatingTodoStatus}
        />
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "done",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex gap-1 text-center "
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="w-4 h-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <span
        className={`capitalize py-1 px-2 rounded-full ${
          row.getValue("done") === true ? "bg-purple-400" : "bg-yellow-400"
        }`}
      >
        {row.getValue("done") === true ? "done" : "not done"}
      </span>
    ),
  },
  {
    accessorKey: "todoName",
    header: () => {
      return <span className="flex">Todo</span>;
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("todoName")}</div>
    ),
  },
  {
    accessorKey: "label",
    header: () => {
      return <span className="flex">Label</span>;
    },
    cell: ({ row }) => (
      <div className="text-[#ec4899] capitalize">{row.getValue("label")}</div>
    ),
  },
  {
    accessorKey: "priority",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex gap-1 text-center "
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Priority
          <ArrowUpDown className="w-4 h-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <span
          className={clsx(
            "px-2 py-1 text-white rounded-full font-medium uppercase",
            row.getValue("priority") === false ? "bg-green-500" : "bg-red-500"
          )}
        >
          {row.getValue("priority") === false ? "Low" : "High"}
        </span>
      );
    },
  },
  {
    accessorKey: "dueDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="flex gap-1 text-right items-center justify-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Due Date
          <ArrowUpDown className="w-4 h-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <span className="font-medium ml-2 md:ml-4">
          {transformDate(row.getValue("dueDate"))}
        </span>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const todo = row.original;

      const [openConfirmDeleteDialog, setOpenConfirmDeleteDialog] =
        useState(false);
      const { deleteTodo, isDeletingTodo } = useDeleteTodo();

      const handleDeleteTodo = async () => {
        try {
          deleteTodo(
            { todoId: todo._id },
            {
              onSuccess: () => {
                toast.success("Task successfully deleted");
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
        }
      };

      return (
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            {/* <DropdownMenuItem>View Task</DropdownMenuItem> */}
            <ViewTask todo={todo} />
            <DropdownMenuSeparator />
            <AddOrEditTask todo={todo}>
              <Button
                variant="outline"
                className="w-full my-2 flex gap-2 bg-gray-300"
              >
                <PenBoxIcon className="w-4 h-4" /> Edit Task
              </Button>
            </AddOrEditTask>
            <ConfirmDeleteDialog
              onClose={setOpenConfirmDeleteDialog}
              open={openConfirmDeleteDialog}
              isPending={isDeletingTodo}
              handleDelete={handleDeleteTodo}
              message="Once deleted the project cannot be recovered"
            />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function TodoTable({ todos }) {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data: todos,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter todos by labels..."
          value={table.getColumn("label")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("label")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={clsx(
                    "transition-all",
                    row?.original?.done && "bg-gray-100 backdrop-blur-[1px]"
                  )}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={clsx(row.original.done && "blur-[1px]")}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
