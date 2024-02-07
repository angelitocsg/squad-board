import { createBrowserRouter } from "react-router-dom";

import GestaoMudancaHome from "./modules/gestao-mudanca/application/pages";
import AcessosHubHome from "./modules/hub/application/pages";
import { PainelProdutos } from "./modules/paineis/application/pages";
import ProdutoDigitalHome from "./modules/produto-digital/application/pages";
import SiglaPage from "./modules/produto-digital/application/pages/siglas";
import RepoHome from "./modules/repositorios/application/pages";
import SprintPlanningHome from "./modules/sprint-planning/application/pages";
import BoardPage from "./pages/board";
import ErrorPage from "./pages/error";
import FaqEditorPage from "./pages/faq-editor";
import HomePage from "./pages/home";
import NotificationsPage from "./pages/notifications";
import OverviewPage from "./pages/overview";
import ProjectsPage from "./pages/projects";
import GmudReport from "./pages/projects/reports/GmudReport";
import SettingsPage from "./pages/settings";
import Main from "./shared/Main";

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
          path: "/tarefas",
          element: <BoardPage />,
        },
        {
          path: "/produtos",
          element: <PainelProdutos />,
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
          path: "/sprint-planning",
          element: <SprintPlanningHome />,
        },
        {
          path: "/cadastros",
          children: [
            {
              path: "/cadastros/siglas",
              element: <SiglaPage />,
            },
            {
              path: "/cadastros/produto-digital",
              element: <ProdutoDigitalHome />,
            },
            {
              path: "/cadastros/repositorios",
              element: <RepoHome />,
            },
            {
              path: "/cadastros/gestao-mudanca",
              element: <GestaoMudancaHome />,
            },
            {
              path: "/cadastros/acessos-hub",
              element: <AcessosHubHome />,
            },
          ],
        },
      ],
    },
  ],
  {
    basename: process.env.NODE_ENV === "development" ? "" : "/squad-board/",
  },
);

export default router;
