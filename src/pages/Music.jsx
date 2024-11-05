import MusicList from "../components/Music/MusicList";
import Uploader from "../components/Music/Uploader";

function Music() {
  return (
    <div className="w-full min-h-full flex flex-col gap-8 p-4">
      <Uploader />
      <MusicList />
    </div>
  );
}

export default Music;
