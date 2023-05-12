import { IImportService } from "../interfaces/IImportService";
import { IProjectGmud } from "../models/IProjectGmud";
import { IProjectMonitoring } from "../models/IProjectMonitoring";
import { IProjectRepository } from "../models/IProjectRepository";
import { IProject } from "../models/IProjects";

export class ProjectService implements IImportService {
  clear() {
    localStorage.removeItem("projects_config");
    localStorage.removeItem("projects_data");
    localStorage.removeItem("projects_repositories");
    localStorage.removeItem("projects_monitoring");
    localStorage.removeItem("projects_gmuds");
  }

  import(data: string) {
    let projectsData = JSON.parse(data) as IProject[];
    if (projectsData.length === 0) return;

    const repositoriesData: IProjectRepository[] = [];
    const gmudsData: IProjectGmud[] = [];
    const monitoringData: IProjectMonitoring[] = [];
    const config: IProject = projectsData.find((f) => f.id === "config") ?? {};

    projectsData = projectsData.filter((f) => f.id !== "config");

    projectsData.forEach((it) => {
      if (it.repositories) {
        repositoriesData.push(
          ...it.repositories.map((rep) => ({ ...rep, projectId: it.id }))
        );
      }
    });

    projectsData.forEach((it) => {
      it.repositories?.forEach((r) => {
        if (r.gmuds) {
          gmudsData.push(
            ...r.gmuds.map((gm) => ({
              ...gm,
              projectId: it.id,
              projectName: it.name,
              repositoryId: r.id,
            }))
          );
        }
      });
    });

    projectsData.forEach((it) => {
      it.monitoring?.forEach((m) => {
        if (m) {
          monitoringData.push({ ...m, projectId: it.id });
        }
      });
    });

    localStorage.setItem("projects_config", JSON.stringify(config));
    localStorage.setItem("projects_data", JSON.stringify(projectsData));
    localStorage.setItem(
      "projects_repositories",
      JSON.stringify(repositoriesData)
    );
    localStorage.setItem("projects_monitoring", JSON.stringify(monitoringData));
    localStorage.setItem("projects_gmuds", JSON.stringify(gmudsData));
  }
}
