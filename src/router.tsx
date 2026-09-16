import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import Subjects from "./pages/Subjects";
import MockTests from "./pages/MockTests";
import Profile from "./pages/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,

    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "subjects",
        element: <Subjects />,
      },
      {
        path: "mock-tests",
        element: <MockTests />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
]);


export default router;