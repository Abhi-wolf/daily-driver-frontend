import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./Layout";
import Profile from "./pages/Profile";
import Files from "./pages/Files";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import TaskManager from "./pages/TaskManager";
import { KanbanBoard } from "./components/TaskManagerComponents/KanbanBoard";
import CalendarPage from "./pages/CalendarPage";
import Music from "./pages/Music";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Todos from "./pages/Todos";
import NotesEditor from "./pages/NotesEditor";
import Folder from "./pages/Folder";
import InitialExplorer from "./pages/InitialExplorer";
import RecycleBin from "./pages/RecycleBin";
import Expenses from "./pages/Expenses";
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/main" element={<Home />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          {/* Make /calendar the index route */}
          <Route index element={<CalendarPage />} />

          {/* Explicitly define /calendar route */}
          <Route path="calendar" element={<CalendarPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/fileExplorer" element={<Files />}>
            <Route index element={<InitialExplorer />} />
            <Route path="file/:fileId" element={<NotesEditor />} />
            <Route path="folder/:folderId" element={<Folder />} />
          </Route>
          <Route path="/music" element={<Music />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/tasksmanager" element={<TaskManager />}>
            <Route
              index
              element={<Navigate to="/tasksmanager/todos" replace />}
            />
            <Route path="todos" element={<Todos />} />
            <Route path="project/:projectId" element={<KanbanBoard />} />
          </Route>

          <Route path="/recyclebin" element={<RecycleBin />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetPassword/:token" element={<ResetPassword />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
