/* eslint-disable react/prop-types */
import { CalendarIcon, FaceIcon, PersonIcon } from "@radix-ui/react-icons";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { useEffect } from "react";
import {
  BadgeIndianRupee,
  FolderPlus,
  Music,
  PenBox,
  Settings,
  Trash2,
} from "lucide-react";
import { useNavigate } from "react-router";

export function CommandDialogMenu({ open, setOpen }) {
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem
              onSelect={() => {
                navigate("/calendar");
              }}
            >
              <CalendarIcon />
              <span className="ml-2">Calendar</span>
            </CommandItem>
            <CommandItem onSelect={() => navigate("/fileExplorer")}>
              <FolderPlus />
              <span className="ml-2">Notes</span>
            </CommandItem>
            <CommandItem onSelect={() => navigate("/tasksmanager")}>
              <FaceIcon />
              <span className="ml-2">Projects</span>
            </CommandItem>
            <CommandItem onSelect={() => navigate("/expenses")}>
              <BadgeIndianRupee />
              <span className="ml-2">Expenses</span>
            </CommandItem>
            <CommandItem onSelect={() => navigate("/music")}>
              <Music />
              <span className="ml-2">Songs</span>
            </CommandItem>
            <CommandItem onSelect={() => navigate("/tasksmanager")}>
              <PenBox />
              <span className="ml-2">Todos</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem onSelect={() => navigate("/profile")}>
              <PersonIcon />
              <span className="ml-2">Profile</span>
            </CommandItem>
            <CommandItem onSelect={() => navigate("/settings")}>
              <Settings />
              <span className="ml-2">Settings</span>
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading="Trash">
            <CommandItem onSelect={() => navigate("/recyclebin")}>
              <Trash2 />
              <span className="ml-2">Trash</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
