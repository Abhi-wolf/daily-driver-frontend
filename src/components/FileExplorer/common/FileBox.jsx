import { FileIcon } from "lucide-react";
import { useNavigate } from "react-router";

/* eslint-disable react/prop-types */
function FileBox({ file }) {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col justify-center items-center gap-1 w-40 h-40 rounded-lg cursor-pointer hover:border-4 border-gray-300 bg-gray-100"
      onClick={() => navigate(`/fileExplorer/file/${file._id}`)}
    >
      <FileIcon className="w-28 lg:w-36 h-24 lg:h-32" />
      <p className="text-center text-gray-600 font-semibold">
        {file?.fileName}
      </p>
    </div>
  );
}

export default FileBox;
