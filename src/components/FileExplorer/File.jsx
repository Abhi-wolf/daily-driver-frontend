// /* eslint-disable react/prop-types */

// import { useParams } from "react-router";
// import { MediumSpinner } from "../Spinners";
// import TextEditor from "./TextEditor";
// import { useGetFile } from "../../hooks/fileExplorer/useFile";

// function File() {
//   const { fileId } = useParams();
//   const { file, isPending } = useGetFile(fileId ? fileId : null);

//   return (
//     <div className="m-2 ">
//       <div className="w-full">
//         {isPending ? (
//           <div className="w-full min-h-full flex justify-center items-center ">
//             <MediumSpinner />
//           </div>
//         ) : (
//           <TextEditor fileId={fileId} note={file?.data} />
//         )}
//       </div>
//     </div>
//   );
// }

// export default File;

// File.jsx - Improved version
/* eslint-disable react/prop-types */

import { useParams } from "react-router";
import { MediumSpinner } from "../Spinners";
import TextEditor from "./TextEditor";
import { useGetFile } from "../../hooks/fileExplorer/useFile";

function File() {
  const { fileId } = useParams();
  const { file, isPending, error } = useGetFile(fileId ? fileId : null);

  if (!fileId) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-600">
            No File Selected
          </h2>
          <p className="text-gray-500 mt-2">Please select a file to view</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600">
            Error Loading File
          </h2>
          <p className="text-gray-500 mt-2">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {isPending ? (
        <div className="flex-1 flex justify-center items-center">
          <div className="text-center">
            <MediumSpinner />
            <p className="mt-4 text-gray-600">Loading file...</p>
          </div>
        </div>
      ) : (
        <TextEditor
          fileId={fileId}
          note={file?.data}
          fileName={file?.fileName}
        />
      )}
    </div>
  );
}

export default File;
