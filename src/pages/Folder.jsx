import { useParams } from "react-router";
// import { useGetUserFileExplorer } from "../hooks/fileExplorer/useGetFileExplorer";
import FolderBox from "../components/FileExplorer/common/FolderBox";
import FileBox from "../components/FileExplorer/common/FileBox";
import { LargeSpinner } from "../components/Spinners";
import DataNotFound from "../components/DataNotFound";
import { useGetFolder } from "../hooks/fileExplorer/useFolder";

function Folder() {
  const params = useParams();
  const { data: folder, isPending } = useGetFolder(
    params?.folderId ? params.folderId : null
  );

  return (
    <div className="flex flex-wrap gap-4 w-full min-h-full p-4 mt-8">
      {isPending ? (
        <div className="w-full min-h-full flex justify-center items-center ">
          <LargeSpinner />
        </div>
      ) : (
        <>
          {folder?.items?.map((item) => {
            if (item.type === "folder")
              return <FolderBox key={item._id} folder={item} />;
            else return <FileBox key={item._id} file={item} />;
          })}

          {folder?.items?.length === 0 && (
            <DataNotFound message="Folder is empty" size="xl" />
          )}
        </>
      )}
    </div>
  );
}

export default Folder;
