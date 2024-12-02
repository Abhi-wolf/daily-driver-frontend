import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { DiamondPlus, MusicIcon } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useUploadSong } from "../../hooks/songs/useUploadSong";

export default function Uploader() {
  const [file, setFile] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [duration, setDuration] = useState(null);
  const fileInputRef = useRef(null);
  const audioRef = useRef(null);
  const { register, handleSubmit } = useForm();
  const { uploadSong, isUploadingSong } = useUploadSong();

  const onSubmit = async () => {
    if (file) {
      const formData = new FormData();
      formData.append("songFile", file);
      formData.append("songName", file.name);

      try {
        uploadSong(formData, {
          onSuccess: () => {
            toast.success("Song uploaded successfully");
          },
        });
      } catch (error) {
        console.error("Upload failed", error);
        toast.error("Failed to upload the song");
      } finally {
        setAudioUrl(null);
        setFile(null);
        setDuration(null);
      }
    }
  };

  const handleCardClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile && selectedFile.type.startsWith("audio/")) {
      // Check file size in MB
      const fileSizeInMB = selectedFile.size / (1024 * 1024);

      console.error("fileSizeInMB = ", fileSizeInMB);

      if (fileSizeInMB > 25) {
        toast.warning("File size should not be greater than 25 MB");
        // You may want to reset the file if the size is too large
        setFile(null);
      } else {
        // Set the file and audio URL if the size is valid
        setFile(selectedFile);
        setAudioUrl(URL.createObjectURL(selectedFile));
      }
    } else {
      toast.warning("Please select a valid audio file.");
    }
  };

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.onloadedmetadata = () => {
        setDuration(audioRef.current?.duration || null);
      };
    }
  }, [audioUrl]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-xl mx-auto mt-8"
    >
      <Card
        className="border-dashed border-2 hover:border-primary cursor-pointer transition-colors duration-300 bg-gradient-to-br from-purple-50 to-blue-50"
        onClick={handleCardClick}
      >
        <CardContent className="flex flex-row justify-around  items-center gap-4 h-50 p-2">
          <MusicIcon className="w-12 h-12 text-primary " />
          <div className="">
            {file ? (
              <div className="flex flex-col ">
                <p className="text-md font-medium text-center my-2">
                  {file.name}
                </p>
                <p className="text-sm text-gray-500 flex items-center justify-center gap-4">
                  <span>
                    Size : {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </span>
                  <span>
                    Duration : {duration && ` ${formatDuration(duration)}`}
                  </span>
                </p>
              </div>
            ) : (
              <>
                <p className="text-lg font-medium text-center">
                  Click to upload your music
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  MP3, WAV, or OGG files accepted
                </p>
              </>
            )}
          </div>

          {file && (
            <div
              onClick={(e) => {
                e.preventDefault();
                setAudioUrl(null);
                setFile(null); // Clear the file state
                fileInputRef.current.value = null; // Reset the file input
              }}
            >
              <DiamondPlus />
            </div>
          )}
        </CardContent>
      </Card>
      <Input
        type="file"
        accept="audio/*"
        className="hidden"
        {...register("file")}
        onChange={handleFileChange}
        disabled={isUploadingSong}
        ref={fileInputRef}
      />
      <Button
        type="submit"
        className="w-full mt-4"
        disabled={!file || isUploadingSong}
      >
        {isUploadingSong ? "Please Wait ..." : "Upload Music"}
      </Button>
      {audioUrl && <audio ref={audioRef} src={audioUrl} className="hidden" />}
    </form>
  );
}
