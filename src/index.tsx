import "./style.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import { DecouplerContext } from "./di/DecouplerContext";
import { ServiceLocator } from "./di/ServiceLocator";
import AlertModalService from "./modules/core/components/AlertModal/AlertModalService";
import AppModalService from "./modules/core/components/AppModal/AppModalService";
import GmudStore from "./modules/gestao-mudanca/application/data/GmudStore";
import GmudRepositoryLocalStorage from "./modules/gestao-mudanca/repository/GmudRepositoryLocalStorage";
import ConsumidorStore from "./modules/hub/application/data/ConsumidorStore";
import ConsumidorRepositoryLocalStorage from "./modules/hub/repository/ConsumidorRepositoryLocalStorage";
import ProductStore from "./modules/produto-digital/application/data/ProductStore";
import SiglaStore from "./modules/produto-digital/application/data/SiglaStore";
import ProductRepositoryLocalStorage from "./modules/produto-digital/repository/ProductRepositoryLocalStorage";
import SiglaRepositoryLocalStorage from "./modules/produto-digital/repository/SiglaRepositoryLocalStorage";
import RepoStore from "./modules/repositorios/application/data/RepoStore";
import RepoRepositoryLocalStorage from "./modules/repositorios/repository/RepoRepositoryLocalStorage";
import TaskRepositoryLocalStorage from "./modules/sprint-planning/repository/TaskRepositoryLocalStorage";
import reportWebVitals from "./reportWebVitals";
import { BoardRepository } from "./repository/BoardRepository";
import { ProjectRepository } from "./repository/ProjectRepository";
import router from "./router";
import { BoardService } from "./services/BoardService";
import { FaqService } from "./services/FaqService";
import { OverviewService } from "./services/OverviewService";
import { ProjectService } from "./services/ProjectService";
import { SettingsService } from "./services/SettingsService";

let locator = new ServiceLocator();
locator.register("AlertModalService", AlertModalService);
locator.register("AppModalService", AppModalService);
locator.register("BoardService", BoardService);
locator.register("BoardRepository", BoardRepository);
locator.register("ConsumidorStore", ConsumidorStore);
locator.register("ConsumidorRepository", ConsumidorRepositoryLocalStorage);
locator.register("FaqService", FaqService);
locator.register("GmudRepository", GmudRepositoryLocalStorage);
locator.register("GmudStore", GmudStore);
locator.register("ProductStore", ProductStore);
locator.register("ProductRepository", ProductRepositoryLocalStorage);
locator.register("RepoRepository", RepoRepositoryLocalStorage);
locator.register("RepoStore", RepoStore);
locator.register("OverviewService", OverviewService);
locator.register("ProjectService", ProjectService);
locator.register("ProjectRepository", ProjectRepository);
locator.register("SettingsService", SettingsService);
locator.register("SiglaRepository", SiglaRepositoryLocalStorage);
locator.register("SiglaStore", SiglaStore);
locator.register("TaskRepository", TaskRepositoryLocalStorage);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <DecouplerContext.Provider value={locator}>
      <RouterProvider router={router} />
    </DecouplerContext.Provider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
