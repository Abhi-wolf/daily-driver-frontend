import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Player from "./components/Music/Player";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <main className="min-h-[100vh] w-full grid grid-rows-[40px_minmax(900px,_1fr)] grid-cols-1 gap-2">
      <Topbar />
      <div className="flex transition-all h-[94vh] mt-12">
        <Sidebar />
        {/* <section className="overflow-y-auto flex gap-2 w-full"> */}
        <section className=" flex gap-2 w-full">
          <Outlet />
          <Player />
        </section>
      </div>
    </main>
  );
}

export default Layout;
