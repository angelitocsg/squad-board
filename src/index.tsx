import "./style.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import { DecouplerContext } from "./di/DecouplerContext";
import { ServiceLocator } from "./di/ServiceLocator";
import reportWebVitals from "./reportWebVitals";
import { BoardRepository } from "./repository/BoardRepository";
import router from "./router";
import { BoardService } from "./services/BoardService";
import { FaqService } from "./services/FaqService";
import { OverviewService } from "./services/OverviewService";
import { ProjectService } from "./services/ProjectService";
import { SettingsService } from "./services/SettingsService";

let locator = new ServiceLocator();
locator.register("BoardService", BoardService);
locator.register("BoardRepository", BoardRepository);
locator.register("FaqService", FaqService);
locator.register("ProjectService", ProjectService);
locator.register("OverviewService", OverviewService);
locator.register("SettingsService", SettingsService);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <DecouplerContext.Provider value={locator}>
      <RouterProvider router={router} />
    </DecouplerContext.Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
