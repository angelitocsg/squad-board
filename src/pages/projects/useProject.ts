import { useEffect, useState } from "react";
import showdown from "showdown";

import ExportHelper from "../../helpers/export.helper";
import { IProjectGmud } from "../../models/IProjectGmud";
import { IProjectMonitoring } from "../../models/IProjectMonitoring";
import {
  IProjectRepository,
  TEnvironment,
} from "../../models/IProjectRepository";
import { IProject } from "../../models/IProjects";
import {
  ISummaryIndicators,
  ISummaryIndicatorsGmuds,
} from "../../models/ISummaryIndicators";
import { ImportService } from "../../services/ImportService";
import { GmudStatus, GmudStatusOrder } from "../../types/TGmudStatus";

const useProject = () => {
  const [projects, set_projects_data] = useState<IProject[]>([]);
  const [projects_config, set_projects_config] = useState<IProject>({});
  const [repositories, set_repositories_data] = useState<IProjectRepository[]>(
    []
  );
  const [monitoring, set_project_monitoring] = useState<IProjectMonitoring[]>(
    []
  );
  const [gmuds, set_projects_gmuds] = useState<IProjectGmud[]>([]);
  const [summary_indicators, set_summary_indicators] =
    useState<ISummaryIndicators>({});

  const handleLoadFile = (data: string) => {
    ImportService.ImportProjectsJson(data);
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  const handleDownloadFile = () => {
    const exportData: IProject[] = [
      projects_config,
      ...projects.map((proj) => {
        proj.repositories = getRepositories(proj.id);
        return proj;
      }),
    ];
    ExportHelper.jsonFile(exportData, "projects");
  };

  const getProjects = () => {
    return projects;
  };

  const getRepositories = (projectId?: string) =>
    projectId && projectId !== ""
      ? repositories.filter((r) => r.projectId === projectId)
      : [];

  const getAppRepositories = () =>
    repositories.filter((repo) => repo.sigla_app);

  const getGmuds = (projectId?: string) =>
    projectId && projectId !== ""
      ? gmuds.filter((g) => g.projectId === projectId)
      : [];

  const getActiveGmuds = () =>
    gmuds.filter(
      (f) =>
        f.status === GmudStatus.PENDENTE ||
        f.status === GmudStatus.PREENCHIDA ||
        f.status === GmudStatus.EM_APROVACAO ||
        f.status === GmudStatus.APROVADA ||
        f.status === GmudStatus.AGENDADA ||
        f.status === GmudStatus.EM_REVISAO
    );

  const getMonitoring = (projectId?: string) =>
    projectId && projectId !== ""
      ? monitoring.filter((g) => g.projectId === projectId)
      : [];

  const getAsMarkdown = (text?: string) => {
    if (!text) return "";
    const converter = new showdown.Converter();
    return converter.makeHtml(text);
  };

  const loadData = () => {
    let ls = localStorage.getItem("projects_data") ?? "[]";
    if (ls) set_projects_data(JSON.parse(ls) as IProject[]);

    ls = localStorage.getItem("projects_config") ?? "{}";
    if (ls) set_projects_config(JSON.parse(ls) as IProject);

    ls = localStorage.getItem("projects_repositories") ?? "[]";
    if (ls) set_repositories_data(JSON.parse(ls) as IProjectRepository[]);

    ls = localStorage.getItem("projects_monitoring") ?? "[]";
    if (ls) set_project_monitoring(JSON.parse(ls) as IProjectMonitoring[]);

    ls = localStorage.getItem("projects_gmuds") ?? "[]";
    if (ls) set_projects_gmuds(JSON.parse(ls) as IProjectGmud[]);
  };

  const _findRepository = (repositoryId: string) =>
    repositories?.find((f) => f.id === repositoryId);

  const _findGmud = (number: string) => gmuds?.find((g) => g.number === number);

  const _getRepositoriesUpdated = (repository: IProjectRepository) =>
    repositories.map((r) => (r.id === repository.id ? repository : r));

  const _getGmudsUpdated = (gmud: IProjectGmud) =>
    gmuds.map((g) => (g.number === gmud.number ? gmud : g));

  const handleRepositoryValueChange = (
    repositoryId?: string,
    name?: string,
    value?: string,
    environment?: TEnvironment
  ) => {
    if (!repositoryId) return;
    if (!name) return;

    let repository = _findRepository(repositoryId);

    if (!repository) return;

    if (environment) {
      repository.environments[environment] = {
        ...repository.environments[environment],
        [name]: value,
      };
    } else {
      repository = {
        ...repository,
        [name]: value,
      };
    }

    const repositoriesUpdated = _getRepositoriesUpdated(repository);
    set_repositories_data(repositoriesUpdated);
  };

  const handleGmudValueChange = (
    gmudNumber?: string,
    name?: string,
    value?: string
  ) => {
    if (!gmudNumber) return;
    if (!name) return;

    let gmud = _findGmud(gmudNumber);

    if (!gmud) return;

    gmud = {
      ...gmud,
      [name]: value,
    };

    const gmudsUpdated = _getGmudsUpdated(gmud);

    set_projects_gmuds(gmudsUpdated);
  };

  useEffect(() => {
    if (gmuds.length === 0) {
      return;
    }

    const gmudsByStatusAndDate = gmuds.map((gm) => ({
      order: GmudStatusOrder.indexOf(
        gm.status ?? GmudStatus.PENDENTE
      ).toString(),
      status: gm.status,
      date: gm.date,
    }));
    let a: ISummaryIndicatorsGmuds[] = [];

    const gmudsSummary = gmudsByStatusAndDate.reduce((p, c) => {
      if (p.find((f) => f.status === c.status)) {
        p = p.map((m) =>
          m.status === c.status ? { ...m, count: m.count + 1 } : m
        );
        return p;
      }
      p.push({ status: c.status, order: c.order, count: 1 });
      return p;
    }, a);

    const indicators: ISummaryIndicators = {
      gmuds: gmudsSummary.sort((a, b) => a.order.localeCompare(b.order)),
    };

    set_summary_indicators(indicators);
  }, [gmuds]);

  useEffect(() => {
    document.title = "Aplicações | Squad";
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    summary_indicators,
    getAppRepositories,
    getProjects,
    getRepositories,
    getGmuds,
    getActiveGmuds,
    getMonitoring,
    getAsMarkdown,
    handleLoadFile,
    handleDownloadFile,
    handleGmudValueChange,
    handleRepositoryValueChange,
  };
};

export default useProject;
