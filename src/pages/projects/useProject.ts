import { useEffect, useState } from "react";
import showdown from "showdown";

import { IProjectGmud } from "../../models/IProjectGmud";
import { IProjectMonitoring } from "../../models/IProjectMonitoring";
import { IProject } from "../../models/IProjects";
import { ISummaryIndicators } from "../../models/ISummaryIndicators";
import { ImportService } from "../../services/ImportService";

const useProject = () => {
  const [projects, set_projects_data] = useState<IProject[]>([]);
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

  const getGmuds = (projectId?: string) =>
    projectId && projectId !== ""
      ? gmuds.filter((g) => g.projectId === projectId)
      : [];

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
    ls = localStorage.getItem("projects_monitoring") ?? "[]";
    if (ls) set_project_monitoring(JSON.parse(ls) as IProjectMonitoring[]);
    ls = localStorage.getItem("projects_gmuds") ?? "[]";
    if (ls) set_projects_gmuds(JSON.parse(ls) as IProjectGmud[]);
    ls = localStorage.getItem("projects_summary_indicators") ?? "{}";
    if (ls) set_summary_indicators(JSON.parse(ls) as ISummaryIndicators);
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
    summary_indicators,
    limparDados,
    getGmuds,
    getMonitoring,
    getAsMarkdown,
    handleLoadFile,
  };
};

export default useProject;
