import DataNotFound from "../components/DataNotFound";
import FileBox from "../components/FileExplorer/common/FileBox";
import FolderBox from "../components/FileExplorer/common/FolderBox";
import { LargeSpinner } from "../components/Spinners";
import { useGetUserFileExplorer } from "../hooks/fileExplorer/useGetFileExplorer";
import ErrorMessage from "../components/ErrorMessage";

function InitialExplorer() {
  const {
    data: explorerData,
    isPending,
    error,
    isError,
  } = useGetUserFileExplorer();

  if (isError) {
    return <ErrorMessage message={error?.message || "Something went wrong"} />;
  }

  return (
    <div className="flex flex-wrap gap-4 w-full p-4 mt-8">
      {isPending ? (
        <div className="w-full min-h-full flex justify-center items-center">
          <LargeSpinner />
        </div>
      ) : (
        <>
          {explorerData?.map((item) => {
            if (item.type === "folder")
              return <FolderBox key={item._id} folder={item} />;
            else return <FileBox key={item._id} file={item} />;
          })}

          {explorerData?.length === 0 && (
            <DataNotFound message="No files and folders found" size="2xl" />
          )}
        </>
      )}
    </div>
  );
}

export default InitialExplorer;
