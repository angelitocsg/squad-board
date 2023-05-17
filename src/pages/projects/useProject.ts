import { useEffect } from "react";
import showdown from "showdown";

import { useService } from "../../di/DecouplerContext";
import { ProjectRepository } from "../../repository/ProjectRepository";
import { ProjectService } from "../../services/ProjectService";

const useProject = () => {
  const service = useService<ProjectService>("ProjectService");
  const repository = useService<ProjectRepository>("ProjectRepository");

  const handleLoadFile = (data: string) => {
    service.import(data);
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  const handleDownloadFile = () => {
    service.export();
  };

  const getProjects = () => repository.getData();

  const getRepositories = (projectId?: string) =>
    repository.getRepositoriesByProjectId(projectId ?? "");

  const getAppRepositories = () => repository.getRepositoriesApp();
  const getAppRepositoriesByProjectId = (projectId?: string) =>
    repository.getRepositoriesAppByProjectId(projectId ?? "");

  const getGmuds = (projectId?: string) =>
    repository.getGmudsByProjectId(projectId ?? "");

  const getActiveGmuds = () => repository.getGmudsActive();

  const getAllGmuds = () => repository.getGmudsAll();

  const getGmudsSummary = () => repository.getGmudsSummary();

  const getMonitoring = (projectId?: string) =>
    repository.getMonitoring(projectId ?? "");

  const getAsMarkdown = (text?: string) => {
    if (!text) return "";
    const converter = new showdown.Converter();
    return converter.makeHtml(text);
  };

  const handleClear = () => {
    service.clear();
  };

  useEffect(() => {
    document.title = "Aplicações | Squad";
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    getGmudsSummary,
    getAppRepositories,
    getAppRepositoriesByProjectId,
    getAllGmuds,
    getProjects,
    getRepositories,
    getGmuds,
    getActiveGmuds,
    getMonitoring,
    getAsMarkdown,
    handleLoadFile,
    handleDownloadFile,
    handleClear,
  };
};

export default useProject;
