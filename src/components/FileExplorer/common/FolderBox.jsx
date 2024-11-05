import { FolderIcon } from "lucide-react";
import { useNavigate } from "react-router";

/* eslint-disable react/prop-types */
function FolderBox({ folder }) {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col justify-center items-center gap-1 w-40 h-40 rounded-lg cursor-pointer hover:border-4 border-gray-300 bg-gray-200"
      onClick={() => navigate(`/fileExplorer/folder/${folder._id}`)}
    >
      <FolderIcon className="w-28 lg:w-36 h-24 lg:h-32" />
      <p className="text-center text-gray-600 font-semibold">
        {folder?.folderName}
      </p>
    </div>
  );
}

export default FolderBox;
