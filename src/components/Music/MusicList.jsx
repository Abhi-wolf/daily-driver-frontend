/* eslint-disable react/prop-types */
import { Pause, PlayIcon, Trash2Icon } from "lucide-react";
import { useGetSongs } from "../../hooks/songs/useGetSongs";
import { LargeSpinner } from "../Spinners";
import { useMusicStore } from "../../store";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useState } from "react";
import { useDeleteSong } from "../../hooks/songs/useDeleteSong";
import { toast } from "sonner";
import DataNotFound from "../DataNotFound";

function MusicList() {
  const { songs, isPending: isGettingSongs } = useGetSongs();

  const { queue, currentTrackIndex } = useMusicStore();

  const currentTrack = queue[currentTrackIndex];

  return (
    <div className="w-[90%] mx-auto flex flex-col gap-4 ">
      <h2 className="text-2xl  text-gray-400 font-bold underline underline-offset-2">
        All Songs
      </h2>

      {isGettingSongs ? (
        <LargeSpinner />
      ) : (
        <ul className="flex flex-col gap-4 m-2">
          {songs?.map((song) => (
            <li
              key={song._id}
              className="flex justify-between items-center text-lg list-none border-2 border-gray-200 p-2 text-gray-600 rounded-md bg-slate-100"
            >
              <span> {song?.songName}</span>

              <div className="flex gap-4 ">
                {currentTrack?._id.toString() === song?._id.toString() ? (
                  <Pause className="h-5 w-5 text-green-500 hover:cursor-not-allowed " />
                ) : (
                  <PlayIcon className="h-5 w-5 text-green-500 hover:cursor-not-allowed " />
                )}

                <ConfirmDeleteDialog songId={song?._id} />
              </div>
            </li>
          ))}
        </ul>
      )}

      {!isGettingSongs && songs.length === 0 && (
        <DataNotFound size="2xl" message="No Songs Found" />
      )}
    </div>
  );
}

export default MusicList;

function ConfirmDeleteDialog({ songId }) {
  const { deleteSong, isDeletingSong } = useDeleteSong();
  const [isOpen, onClose] = useState(false);

  const handleDeleteSong = () => {
    try {
      deleteSong(
        { songId },
        {
          onSuccess: () => {
            toast.success("Song successfully deleted");
          },
          onError: (err) => {
            console.error(err);
            toast.error(err?.message);
          },
        }
      );
    } catch (error) {
      console.error(error);
      // toast.error()
    }
  };

  return (
    <Dialog onOpenChange={onClose} open={isOpen} modal defaultOpen={false}>
      <DialogTrigger asChild>
        <Trash2Icon className="h-5 w-5 text-red-500 hover:cursor-pointer hover:text-red" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] p-8">
        <DialogHeader>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogDescription>
            Once deleted the song cannot be recovered
          </DialogDescription>
        </DialogHeader>
        <Button
          type="submit"
          variant="destructive"
          disabled={isDeletingSong}
          onClick={handleDeleteSong}
        >
          Confirm Delete
        </Button>
      </DialogContent>
    </Dialog>
  );
}
