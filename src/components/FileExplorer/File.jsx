/* eslint-disable react/prop-types */

import { useParams } from "react-router";
import { MediumSpinner } from "../Spinners";
import TextEditor from "./TextEditor";
import { useGetFile } from "../../hooks/fileExplorer/useFile";

function File() {
  const { fileId } = useParams();
  const { file, isPending } = useGetFile(fileId ? fileId : null);

  return (
    <div className="m-2 ">
      <div className="w-full">
        {isPending ? (
          <div className="w-full min-h-full flex justify-center items-center ">
            <MediumSpinner />
          </div>
        ) : (
          <TextEditor fileId={fileId} note={file?.data} />
        )}
      </div>
    </div>
  );
}

export default File;
