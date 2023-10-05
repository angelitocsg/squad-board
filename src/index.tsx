import './style.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { DecouplerContext } from './di/DecouplerContext';
import { ServiceLocator } from './di/ServiceLocator';
import AlertModalService from './modules/core/components/AlertModal/AlertModalService';
import AppModalService from './modules/core/components/AppModal/AppModalService';
import GmudStore from './modules/gestao-mudanca/application/store/GmudStore';
import GmudDAOLocalStorage from './modules/gestao-mudanca/infra/repository/GmudDAOLocalStorage';
import reportWebVitals from './reportWebVitals';
import { BoardRepository } from './repository/BoardRepository';
import { ProjectRepository } from './repository/ProjectRepository';
import router from './router';
import { BoardService } from './services/BoardService';
import { FaqService } from './services/FaqService';
import { OverviewService } from './services/OverviewService';
import { ProjectService } from './services/ProjectService';
import { SettingsService } from './services/SettingsService';

let locator = new ServiceLocator();
locator.register("AlertModalService", AlertModalService);
locator.register("AppModalService", AppModalService);
locator.register("BoardService", BoardService);
locator.register("BoardRepository", BoardRepository);
locator.register("FaqService", FaqService);
locator.register("GmudDAOLocalStorage", GmudDAOLocalStorage);
locator.register("GmudStore", GmudStore);
locator.register("OverviewService", OverviewService);
locator.register("ProjectService", ProjectService);
locator.register("ProjectRepository", ProjectRepository);
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
