import { createBrowserRouter } from "react-router-dom";

import BoardPage from "./pages/board";
import Main from "./shared/Main";
import Projects from "./pages/projects";
import HomePage from "./pages/home";
import NotificationsPage from "./pages/notifications";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Main />,
      errorElement: <div>Error 404</div>,
      children: [
        {
          path: "/home",
          element: <HomePage />,
        },
        {
          path: "/board",
          element: <BoardPage />,
        },
        {
          path: "/projects",
          element: <Projects />,
        },
        {
          path: "/notifications",
          element: <NotificationsPage />,
        },
      ],
    },
  ],
  {
    basename: process.env.NODE_ENV === "development" ? "" : "/squad-board/",
  }
);

export default router;
