import { createBrowserRouter } from "react-router-dom";

import BoardPage from "./pages/board";
import ErrorPage from "./pages/error";
import FaqEditorPage from "./pages/faq-editor";
import HomePage from "./pages/home";
import NotificationsPage from "./pages/notifications";
import OverviewPage from "./pages/overview";
import ProjectsPage from "./pages/projects";
import GmudReport from "./pages/projects/reports/GmudReport";
import Main from "./shared/Main";
import SettingsPage from "./pages/settings";
import GestaoMudancaHome from "./modules/gestao-mudanca/application/pages";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Main />,
      errorElement: <ErrorPage />,
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
          element: <ProjectsPage />,
        },
        {
          path: "/overview",
          element: <OverviewPage />,
        },
        {
          path: "/notifications",
          element: <NotificationsPage />,
        },
        {
          path: "/faq-editor",
          element: <FaqEditorPage />,
        },
        {
          path: "/reports",
          children: [
            {
              path: "/reports/gmuds",
              element: <GmudReport />,
            },
          ],
        },
        {
          path: "/settings",
          element: <SettingsPage />,
        },
        {
          path: "/gmuds",
          element: <GestaoMudancaHome />,
        },
      ],
    },
  ],
  {
    basename: process.env.NODE_ENV === "development" ? "" : "/squad-board/",
  }
);

export default router;
