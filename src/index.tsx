import "./style.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import reportWebVitals from "./reportWebVitals";
import router from "./router";
import { DecouplerContext } from "./di/DecouplerContext";
import { ServiceLocator } from "./di/ServiceLocator";
import { BoardService } from "./services/BoardService";
import { BoardRepository } from "./repository/BoardRepository";
import { ProjectService } from "./services/ProjectService";
import { FaqService } from "./services/FaqService";
import { OverviewService } from "./services/OverviewService";
import { SettingsService } from "./services/SettingsService";

let locator = new ServiceLocator();
locator.register("BoardService", BoardService.name);
locator.register("BoardRepository", BoardRepository.name);
locator.register("FaqService", FaqService.name);
locator.register("ProjectService", ProjectService.name);
locator.register("OverviewService", OverviewService.name);
locator.register("SettingsService", SettingsService.name);

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
