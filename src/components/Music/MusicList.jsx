/* eslint-disable react/prop-types */
import { Pause, PlayIcon } from "lucide-react";
import { useGetSongs } from "../../hooks/songs/useGetSongs";
import { LargeSpinner } from "../Spinners";
import { useMusicStore } from "../../store";

import { useState } from "react";
import { useDeleteSong } from "../../hooks/songs/useDeleteSong";
import { toast } from "sonner";
import DataNotFound from "../DataNotFound";
import ConfirmDeleteDialog from "../ConfirmDeleteDialog";

function MusicList() {
  const [openConfirmDeleteDialog, setOpenConfirmDeleteDialog] = useState(false);
  const { songs, isPending: isGettingSongs } = useGetSongs();
  const { queue, currentTrackIndex } = useMusicStore();
  const { deleteSong, isDeletingSong } = useDeleteSong();

  const currentTrack = queue[currentTrackIndex];

  const handleDeleteSong = (songId) => {
    try {
      deleteSong(
        { songId },
        {
          onSuccess: () => {
            toast.success("Song successfully deleted");
          },
          onError: (err) => {
            toast.error(err?.message);
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

                <ConfirmDeleteDialog
                  onClose={setOpenConfirmDeleteDialog}
                  open={openConfirmDeleteDialog}
                  isPending={isDeletingSong}
                  handleDelete={() => handleDeleteSong(song._id)}
                  message="Once deleted the song cannot be recovered"
                />
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
