import { createBrowserRouter } from 'react-router-dom';

import BoardPage from './pages/board';
import Home from './pages/home';
import Projects from './pages/projects';

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Home />,
      errorElement: <div>Error 404</div>,
      children: [
        {
          path: "/board",
          element: <BoardPage />,
        },

        {
          path: "/projects",
          element: <Projects />,
        },
      ],
    },
  ],
  {
    basename: process.env.NODE_ENV === "development" ? "" : "/squad-board/",
  }
);

export default router;
