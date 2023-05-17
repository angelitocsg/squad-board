import { StorageKey } from "../enums/StorageKey";
import ExportHelper from "../helpers/export.helper";
import { IExportService } from "../interfaces/IExportService";
import { IImportService } from "../interfaces/IImportService";
import { IProjectGmud } from "../models/IProjectGmud";
import { IProjectMonitoring } from "../models/IProjectMonitoring";
import { IProjectRepository } from "../models/IProjectRepository";
import { IProject } from "../models/IProjects";
import { ProjectRepository } from "../repository/ProjectRepository";

export class ProjectService implements IImportService, IExportService {
  projectRepository = new ProjectRepository();

  clear() {
    localStorage.removeItem(StorageKey.PROJECTS_DATA);
  }

  import(data: string) {
    let projectsData = JSON.parse(data) as IProject[];
    if (projectsData.length === 0) return;

    const repositoriesData: IProjectRepository[] = [];
    const gmudsData: IProjectGmud[] = [];
    const monitoringData: IProjectMonitoring[] = [];

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

    localStorage.setItem(
      StorageKey.PROJECTS_DATA,
      JSON.stringify(projectsData)
    );
  }

  export() {
    ExportHelper.jsonFile(this.projectRepository.getData(), "projects");
  }
}
