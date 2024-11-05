import { useEffect, useRef } from "react";
import { useGetSongs } from "../../hooks/songs/useGetSongs";
import { useMusicStore } from "../../store";
import { Button } from "../ui/button";

function Player() {
  const {
    queue,
    currentTrackIndex,
    isPlaying,
    playNext,
    playPrev,
    addTracksToQueue,
  } = useMusicStore();

  const audioRef = useRef(null);
  const { songs, isLoading } = useGetSongs();

  useEffect(() => {
    if (songs) {
      addTracksToQueue(songs);
    }
  }, [songs, addTracksToQueue]);

  const currentTrack = queue[currentTrackIndex];

  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play();
    } else if (!isPlaying && audioRef.current) {
      audioRef.current.pause();
    }
  }, [isPlaying, currentTrack]);

  const handleNext = () => {
    playNext();
  };

  const handlePrev = () => {
    playPrev();
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="w-full h-12 bg-gray-100 text-gray-500 fixed bottom-0 right-0 left-0 flex items-center justify-between px-4">
      {currentTrack ? (
        <>
          {/* Now Playing Info */}
          <div className="flex items-center space-x-4 w-[10%]">
            <h3 className="text-md font-semibold truncate whitespace-nowrap overflow-hidden">
              {currentTrack.songName}
            </h3>
          </div>

          {/* Audio Element (Hidden) */}
          <audio
            key={currentTrack?._id}
            ref={audioRef}
            src={currentTrack.songUrl}
            onEnded={handleNext}
            controls
            className="w-[80%] h-8"
          />

          {/* Audio Controls */}
          <div className="flex items-center space-x-4">
            <Button
              variant="secondary"
              onClick={handlePrev}
              className="bg-gray-300 hover:bg-gray-500"
            >
              Previous
            </Button>

            <Button
              variant="secondary"
              onClick={handleNext}
              className="bg-gray-300 hover:bg-gray-500"
            >
              Next
            </Button>
          </div>
        </>
      ) : (
        <p className="text-lg">No track is currently playing</p>
      )}
    </div>
  );
}

export default Player;
