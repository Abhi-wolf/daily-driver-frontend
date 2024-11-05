import { Outlet } from "react-router";
import Folderbar from "../components/FileExplorer/Folderbar";

function Files() {
  return (
    <>
      <Folderbar />
      <div className="w-full overflow-x-hidden">
        <Outlet />
      </div>
    </>
  );
}

export default Files;
