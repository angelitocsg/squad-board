import Papa from "papaparse";

import { SEM_ALOCACAO, SEM_FEATURE } from "../constants/board.constants";
import { IssueStatus } from "../enums/IssueStatus";
import { StorageKey } from "../enums/StorageKey";
import { IImportService } from "../interfaces/IImportService";
import { IBoardIssue } from "../models/IBoardIssue";
import { BoardRepository } from "../repository/BoardRepository";

export class BoardService implements IImportService {
  boardRepository = new BoardRepository();

  totalStoryPoints: number;
  completedStoryPoints: number;

  constructor() {
    this.totalStoryPoints = this.boardRepository.countStoryPoints();
    this.completedStoryPoints =
      this.boardRepository.countCompletedStoryPoints();
  }

  clear() {
    localStorage.removeItem(StorageKey.BOARD_DATA_ISSUES);
    localStorage.removeItem(StorageKey.BOARD_DATA_FEATURES);
  }

  import(data: string) {
    const parsedCsv = Papa.parse(data);

    let columns = this._columnsParse(parsedCsv.data.shift() as string[]);
    const lines = parsedCsv.data as [];

    const dataIssues = this._sortIssues(
      this._addParentInfo(
        this._filterValidIssues(this._convertCsvToJson(columns, lines)),
      ),
    );

    const features_id = dataIssues
      .filter(
        (f) => f.parent_id?.startsWith("FETR") || f.parent_id === SEM_FEATURE,
      )
      .reduce((p, c) => {
        const parentId = c.parent_id ? c.parent_id : SEM_FEATURE;
        if (parentId && !p.find((f) => f === parentId)) {
          p.push(parentId);
        }
        return p;
      }, [] as string[])
      .sort((a, b) => a.localeCompare(b))
      .map((f) => ({ id: f, label: f }));

    localStorage.setItem(
      StorageKey.BOARD_DATA_ISSUES,
      JSON.stringify(dataIssues),
    );

    localStorage.setItem(
      StorageKey.BOARD_DATA_FEATURES,
      JSON.stringify(features_id),
    );
  }

  private _columnsParse(columns: string[]): string[] {
    return columns.map((c) =>
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
        : c.trim() === "u_impediment"
        ? "impediment"
        : c.trim() === "u_impediment_desc"
        ? "impediment_description"
        : "",
    );
  }

  private _convertCsvToJson(
    columnNames: string[],
    lines: any[],
  ): IBoardIssue[] {
    return lines.map((values: string[]) => {
      const it: any = {};
      for (let i = 0; i < columnNames.length; i++) {
        switch (columnNames[i]) {
          case "assignee":
            if (!values[i]?.toUpperCase()) {
              it[columnNames[i]] = SEM_ALOCACAO;
              break;
            }
            it[columnNames[i]] = values[i]?.toUpperCase();
            break;
          case "status":
            // Aqui agrupa os status no board
            const itValue = values[i]?.toUpperCase();
            it[columnNames[i]] =
              itValue === IssueStatus.ENCERRADO ||
              itValue === IssueStatus.ATIVADO ||
              itValue === IssueStatus.ATIVADO_DISPONIVEL_USO ||
              itValue === IssueStatus.VALIDADA
                ? IssueStatus.ENCERRADO_ATIVADO
                : itValue === IssueStatus.EM_EXPLORACAO
                ? IssueStatus.EM_REFINAMENTO
                : itValue === IssueStatus.EM_VALIDACAO_DE_HIPOTESES
                ? IssueStatus.EM_EXECUCAO
                : itValue === IssueStatus.EM_IMPLANTACAO
                ? IssueStatus.IMPLANTADO
                : itValue;
            break;
          case "id":
          case "description":
            it[columnNames[i]] = values[i]?.toUpperCase();
            break;
          case "impediment":
            it[columnNames[i]] =
              values[i]?.toUpperCase() === "FALSO" || !values[i] ? false : true;
            break;
          case "type":
            const col_value = values[i]?.toLowerCase();
            it[columnNames[i]] = values[i]?.toLowerCase();
            if (col_value === "sub") {
              it[columnNames[i]] = "sub-task";
              continue;
            }
            if (col_value === "história") {
              it[columnNames[i]] = "story";
              continue;
            }
            if (col_value === "tarefa") {
              it[columnNames[i]] = "task";
              continue;
            }
            if (col_value === "oportunidade") {
              it[columnNames[i]] = "opportunity";
              continue;
            }
            break;
          case "parent_id":
            it[columnNames[i]] =
              values[i] && values[i] !== "0" ? values[i] : SEM_FEATURE;
            break;
          default:
            it[columnNames[i]] = values[i];
            break;
        }
      }
      return it;
    });
  }

  private _filterValidIssues(issues: IBoardIssue[]) {
    return issues.filter((issue) => issue.id);
  }

  private _addParentInfo(issues: IBoardIssue[]) {
    return issues.map((x: IBoardIssue, _, issues: IBoardIssue[]) => {
      x.parent_description = issues.find(
        (f) => f.id === x.parent_id,
      )?.description;
      return x;
    });
  }

  private _sortIssues(issues: IBoardIssue[]) {
    return issues.sort(
      (a: IBoardIssue, b: IBoardIssue) =>
        a.description?.localeCompare(b.description ?? "") ?? 0,
    );
  }
}
