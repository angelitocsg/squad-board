import { GmudStatus } from "../enums/GmudStatus";
import { StorageKey } from "../enums/StorageKey";
import { IProjectGmud } from "../models/IProjectGmud";
import { IProjectMonitoring } from "../models/IProjectMonitoring";
import { IProjectRepository } from "../models/IProjectRepository";
import { IProject } from "../models/IProjects";
import {
  ISummaryIndicators,
  ISummaryIndicatorsGmuds,
} from "../models/ISummaryIndicators";
import { GmudStatusOrder } from "../types/TGmudStatus";

export class ProjectRepository {
  private data: IProject[];

  constructor() {
    this.data = this._load();
  }

  private _load() {
    let ls = localStorage.getItem(StorageKey.PROJECTS_DATA);
    if (ls) return JSON.parse(ls);
    return [];
  }

  getData() {
    return this.data.filter((f) => f.id) ?? [];
  }

  getGmudsAll(): IProjectGmud[] {
    return this.getRepositories().reduce((p, c) => {
      if (c.gmuds)
        p.push(
          ...c.gmuds.map((gmud) => ({
            ...gmud,
            projectId: c.projectId,
            projectName: c.projectName,
            repositoryId: c.id,
          }))
        );
      return p;
    }, [] as IProjectGmud[]);
  }

  getGmudsByProjectId(projectId: string): IProjectGmud[] {
    return this.getGmudsAll().filter((f) => f.projectId === projectId);
  }

  getGmudsActive() {
    return this.getGmudsAll().filter(
      (f) =>
        f.status !== GmudStatus.PUBLICADA &&
        f.status !== GmudStatus.CANCELADA &&
        f.status !== GmudStatus.FALHA
    );
  }

  getGmudsSummary(): ISummaryIndicators {
    const gmuds = this.getGmudsAll().reduce((p, gmud) => {
      if (p.find((f) => f.status === gmud.status)) {
        p = p.map((indicator) =>
          indicator.status === gmud.status
            ? { ...indicator, count: indicator.count + 1 }
            : indicator
        );
      } else {
        p.push({
          status: gmud.status,
          order: GmudStatusOrder.indexOf(
            gmud.status ?? GmudStatus.PENDENTE
          ).toString(),
          count: 1,
        });
      }
      return p;
    }, [] as ISummaryIndicatorsGmuds[]);

    return { gmuds: gmuds.sort((a, b) => a.order.localeCompare(b.order)) };
  }

  getMonitoring(projectId: string): IProjectMonitoring[] {
    return this.getData()
      .filter((f) => f.id === projectId)
      ?.filter((f) => f.monitoring)
      ?.reduce((p, c) => {
        if (c.monitoring) {
          p.push(...c.monitoring?.map((m) => ({ ...m, projectId: c.id })));
        }
        return p;
      }, [] as IProjectMonitoring[]);
  }

  getRepositories(): IProjectRepository[] {
    return this.getData().reduce((p, c) => {
      if (c.repositories) {
        p.push(
          ...c.repositories.map((r) => ({
            ...r,
            projectId: c.id,
            projectName: c.name,
          }))
        );
      }
      return p;
    }, [] as IProjectRepository[]);
  }

  getRepositoriesByProjectId(projectId: string): IProjectRepository[] {
    return this.getRepositories().filter((f) => f.projectId === projectId);
  }

  getRepositoriesApp(): IProjectRepository[] {
    return this.getData()?.reduce((p, c) => {
      if (c.repositories)
        p.push(
          ...c.repositories
            .filter((f) => f.sigla_app && f.type.indexOf("-DEP") === -1)
            .map((r) => ({ ...r, projectId: c.id }))
        );
      return p;
    }, [] as IProjectRepository[]);
  }

  getRepositoriesAppByProjectId(projectId: string): IProjectRepository[] {
    return this.getRepositoriesApp().filter((f) => f.projectId === projectId);
  }
}
