import { StorageKey } from "../enums/StorageKey";
import ExportHelper from "../helpers/export.helper";
import { IExportService } from "../interfaces/IExportService";
import { IImportService } from "../interfaces/IImportService";
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

    localStorage.setItem(
      StorageKey.PROJECTS_DATA,
      JSON.stringify(projectsData)
    );
  }

  export() {
    ExportHelper.jsonFile(this.projectRepository.getData(), "projects");
  }
}
