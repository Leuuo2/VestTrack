import { createBrowserRouter } from "react-router-dom";
import Landing from "./pages/Landing";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import Subjects from "./pages/Subjects";
import SubjectDetails from "./pages/SubjectDetails";
import MockTests from "./pages/MockTests";
import Profile from "./pages/Profile";
import Sync from "./pages/Sync";
import Questions from "./pages/Questions";
import Today from "./pages/Today";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/app",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "today",
        element: <Today />,
      },
      {
        path: "subjects",
        element: <Subjects />,
      },
      {
        path: "subjects/:id",
        element: <SubjectDetails />,
      },
      {
        path: "mock-tests",
        element: <MockTests />,
      },
      {
        path: "questions",
        element: <Questions />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "sync",
        element: <Sync />,
      },
    ],
  },
]);

export default router;
