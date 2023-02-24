import Papa from "papaparse";

import { BoardIssues } from "../interfaces/BoardIssues";
import { IOverview } from "../models/IOverview";
import { IProjectGmud } from "../models/IProjectGmud";
import { IProjectMonitoring } from "../models/IProjectMonitoring";
import { IProjectRepository } from "../models/IProjectRepository";
import { IProject } from "../models/IProjects";
import {
  ISummaryIndicators,
  ISummaryIndicatorsGmuds,
} from "../models/ISummaryIndicators";
import { GmudStatus, GmudStatusOrder } from "../types/TGmudStatus";

export const SEM_ALOCACAO = "[SEM ALOCAÇÃO]";

export class ImportService {
  static ImportOverviewJson(data: string) {
    let overviewData = JSON.parse(data) as IOverview;
    
    // localStorage.setItem("overview_data", JSON.stringify(overviewData));
    localStorage.setItem("overview_features", JSON.stringify(overviewData.features));
    localStorage.setItem("overview_members", JSON.stringify(overviewData.members));
    localStorage.setItem("overview_tasks", JSON.stringify(overviewData.tasks));   
  }

  static ImportProjectsJson(data: string) {
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

    const gmudsByStatusAndDate = gmudsData.map((gm) => ({
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

    localStorage.setItem("projects_config", JSON.stringify(config));
    localStorage.setItem("projects_data", JSON.stringify(projectsData));
    localStorage.setItem(
      "projects_repositories",
      JSON.stringify(repositoriesData)
    );
    localStorage.setItem("projects_monitoring", JSON.stringify(monitoringData));
    localStorage.setItem("projects_gmuds", JSON.stringify(gmudsData));
    localStorage.setItem(
      "projects_summary_indicators",
      JSON.stringify(indicators)
    );
  }

  static ImportCSV(data: string) {
    const parsedCsv = Papa.parse(data);

    let columns = parsedCsv.data.shift() as string[];
    columns = columns.map((c) =>
      c.trim() === "parent"
        ? "parent_id"
        : c.trim() === "number"
        ? "id"
        : c.trim() === "sys_class_name"
        ? "type"
        : c.trim() === "short_description"
        ? "description"
        : c.trim() === "assigned_to"
        ? "assignee"
        : c.trim() === "state"
        ? "status"
        : c.trim() === "u_iu_agile_sprint"
        ? "sprint_name"
        : c.trim() === "u_squad"
        ? "squad_name"
        : c.trim() === "u_effort"
        ? "story_points"
        : ""
    );

    const lines = parsedCsv.data as [];

    const dataIssues: BoardIssues[] = lines
      .map((cols: string[]) => {
        const it: any = {};
        for (let i = 0; i < columns.length; i++) {
          switch (columns[i]) {
            case "assignee":
              if (!cols[i]?.toUpperCase()) {
                it[columns[i]] = SEM_ALOCACAO;
                break;
              }
              it[columns[i]] = cols[i]?.toUpperCase();
              break;
            case "status":
              const itValue = cols[i]?.toUpperCase();
              it[columns[i]] =
                itValue === "ENCERRADO" ||
                itValue === "ATIVADO" ||
                itValue === "CANCELADO"
                  ? "ENCERRADO/ATIVADO/CANCELADO"
                  : itValue;
              break;
            case "id":
            case "description":
              it[columns[i]] = cols[i]?.toUpperCase();
              break;
            case "type":
              const col_value = cols[i]?.toLowerCase();
              it[columns[i]] = cols[i]?.toLowerCase();
              if (col_value === "sub") {
                it[columns[i]] = "sub-task";
                continue;
              }
              if (col_value === "história") {
                it[columns[i]] = "story";
                continue;
              }
              if (col_value === "tarefa") {
                it[columns[i]] = "task";
                continue;
              }
              break;
            default:
              it[columns[i]] = cols[i];
              break;
          }
        }
        return it;
      })
      .filter((x: BoardIssues) => x.id)
      .map((x: BoardIssues, i: number, issues: BoardIssues[]) => {
        x.parent_description = issues.find(
          (f) => f.id === x.parent_id
        )?.description;
        return x;
      })
      .sort(
        (a: BoardIssues, b: BoardIssues) =>
          a.description?.localeCompare(b.description ?? "") ?? 0
      );

    const assignees = dataIssues
      .reduce((p, c) => {
        if (p.find((f) => f.assignee === c.assignee)) return p;
        p.push({
          id: this.getHash(c.assignee),
          description: c.assignee,
          assignee: c.assignee,
        } as BoardIssues);
        return p;
      }, [] as BoardIssues[])
      .sort((a, b) => a.assignee.localeCompare(b.assignee))
      .map((it) => {
        it.issues = dataIssues.filter((f) => f.assignee === it.assignee);
        return it;
      });

    const features = dataIssues
      .filter((f) => f.type?.toLowerCase() === "feature")
      .map((it) => {
        it.issues = dataIssues.filter((f) => f.parent_id === it.id);
        return it;
      });

    const story_task_bug = dataIssues
      .filter(
        (f) =>
          f.type?.toLowerCase() === "bug" ||
          f.type?.toLowerCase() === "task" ||
          f.type?.toLowerCase() === "story"
      )
      .map((it) => {
        it.issues = dataIssues.filter((f) => f.parent_id === it.id);
        return it;
      });

    const sprintName = dataIssues[0]?.sprint_name;
    const squadName = dataIssues[0]?.squad_name;

    const setStatusId = (status?: string) => {
      switch (status) {
        case "A FAZER":
          return "0";
        case "EM EXECUÇÃO":
          return "2";
        case "EM TESTES":
          return "3";
        case "EM REFINAMENTO":
          return "4";
        case "ENCERRADO/ATIVADO/CANCELADO":
          return "7";
        default:
          return "9";
      }
    };
    const statusx: { status?: string; id: string; items: number }[] = [
      {
        id: "0",
        status: "A FAZER",
        items: 0,
      },
      {
        id: "1",
        status: "EM EXECUÇÃO",
        items: 0,
      },
      {
        id: "4",
        status: "ENCERRADO/ATIVADO/CANCELADO",
        items: 0,
      },
    ];
    const status = dataIssues
      .map((d) => ({
        status: d.status,
        id: setStatusId(d.status),
        items: dataIssues.filter((f) => f.status === d.status)?.length,
      }))
      .reduce((p, c) => {
        if (p.find((f) => f.status === c.status)) return p;
        p.push(c);
        return p;
      }, statusx)
      .sort((a, b) => a.id.localeCompare(b.id));

    localStorage.setItem("board_data_sprint_name", sprintName ?? "");
    localStorage.setItem("board_data_squad_name", squadName ?? "");
    localStorage.setItem("board_data_features", JSON.stringify(features));
    localStorage.setItem(
      "board_data_story_task_bug",
      JSON.stringify(story_task_bug)
    );
    localStorage.setItem("board_data_assignees", JSON.stringify(assignees));
    localStorage.setItem("board_data_status", JSON.stringify(status));
    return "";
  }

  private static getHash(value: string) {
    var hash = 0,
      i,
      chr;
    if (value.length === 0) return hash;
    for (i = 0; i < value.length; i++) {
      chr = value.charCodeAt(i);
      hash = (hash << 5) - hash + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return "I" + hash.toString();
  }
}
