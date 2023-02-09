import { useEffect, useState } from "react";
import { IProjectGmud } from "../../models/IProjectGmud";
import { IProjectRepository } from "../../models/IProjectRepository";
import showdown from "showdown";
import { IProject } from "../../models/IProjects";
import { ImportService } from "../../services/ImportService";

const useProject = () => {
  const [projects, set_projects_data] = useState<IProject[]>([]);
  const [repositories, set_projects_repositories] = useState<
    IProjectRepository[]
  >([]);
  const [gmuds, set_projects_gmuds] = useState<IProjectGmud[]>([]);

  const handleLoadFile = (data: string) => {
    ImportService.ImportProjectsJson(data);
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  const getGmuds = (projectId?: string) =>
    projectId && projectId !== ""
      ? gmuds.filter((g) => g.projectId === projectId)
      : [];

  const getAsMarkdown = (text?: string) => {
    if (!text) return '';
    const converter = new showdown.Converter();
    return converter.makeHtml(text);
  };

  const loadData = () => {
    let ls = localStorage.getItem("projects_data") ?? "[]";
    if (ls) set_projects_data(JSON.parse(ls) as IProject[]);
    ls = localStorage.getItem("projects_repositories") ?? "[]";
    if (ls) set_projects_repositories(JSON.parse(ls) as IProjectRepository[]);
    ls = localStorage.getItem("projects_gmuds") ?? "[]";
    if (ls) set_projects_gmuds(JSON.parse(ls) as IProjectGmud[]);
  };

  const limparDados = () => {
    localStorage.clear();
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    projects,
    limparDados,
    getGmuds,
    getAsMarkdown,
    handleLoadFile,
  };
};

export default useProject;
