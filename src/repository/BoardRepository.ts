import { IStatus } from "../components/BoardColumnStatus";
import { IssueStatus } from "../enums/IssueStatus";
import { IssueType } from "../enums/IssueType";
import { StorageKey } from "../enums/StorageKey";
import { IBoardAssignee } from "../models/IBoardAssignee";
import { IBoardIssue } from "../models/IBoardIssue";

export class BoardRepository {
  private data: IBoardIssue[];
  private current_assignee: string | null = null;
  private current_feature: string | null = null;
  private current_status: string | null = null;
  private current_hidden: string[] = [];

  constructor() {
    this.data = this._load();
  }

  private _load() {
    let ls = localStorage.getItem(StorageKey.BOARD_DATA_ISSUES);
    if (ls) return JSON.parse(ls);
    return [];
  }

  private getData() {
    return this.data ?? [];
  }

  countStoryPoints() {
    return this.getData()
      .map((x) => +(x.story_points?.toString() ?? "0"))
      .reduce((p, c) => p + c, 0);
  }

  countCompletedStoryPoints() {
    return this.getData()
      .filter((x) => x.status === IssueStatus.ENCERRADO_ATIVADO)
      .map((x) => +(x.story_points?.toString() ?? "0"))
      .reduce((p, c) => p + c, 0);
  }

  countTasks() {
    return this.getData().length;
  }

  getAssignees() {
    return this.getData()
      .reduce((p, c) => {
        if (p.find((f) => f.name === c.assignee)) return p;
        p.push({ id: this._getHash(c.assignee), name: c.assignee });
        return p;
      }, [] as IBoardAssignee[])
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  getFeatures() {
    return this.getData()
      .filter((f) => f.parent_id?.startsWith("FETR"))
      .reduce((p, c) => {
        if (c.parent_id && !p.find((f) => f === c.parent_id)) {
          p.push(c.parent_id);
        }
        return p;
      }, [] as string[])
      .sort((a, b) => a.localeCompare(b));
  }

  getAllIssues() {
    return this.getData()
      .filter(
        (f) =>
          f.type?.toLowerCase() === "bug" ||
          f.type?.toLowerCase() === "task" ||
          f.type?.toLowerCase() === "story"
      )
      .map((it) => {
        it.issues = this.getData().filter((f) => f.parent_id === it.id);
        return it;
      });
  }

  getSprintName() {
    if (this.getData().length === 0) return "Sprint";
    return this.getData()[0].sprint_name ?? "Sprint";
  }

  filterByAssignee(assignee: string): IBoardIssue[] {
    this.current_assignee = assignee === "" ? null : assignee;
    return this._filter();
  }

  filterByStatus(status: string): IBoardIssue[] {
    this.current_status = status === "" ? null : status;
    return this._filter();
  }

  filterByFeature(feature: string): IBoardIssue[] {
    this.current_feature = feature === "" ? null : feature;
    return this._filter();
  }

  hiddenByIssueType(hidden: string[]): IBoardIssue[] {
    this.current_hidden = hidden;
    return this._filter();
  }

  private _filter(): IBoardIssue[] {
    let issues = this.getAllIssues();

    if (this.current_assignee) issues = this._getIssueByAssignee(issues);
    if (this.current_feature) issues = this._getIssueByFeature(issues);
    if (this.current_status) issues = this._getIssueByStatus(issues);
    if (this.current_hidden.length > 0) issues = this._getIssueByHidden(issues);

    return issues;
  }

  private _getIssueByAssignee(issues: IBoardIssue[]): IBoardIssue[] {
    console.log("_getIssueByAssignee", this.current_assignee);

    return issues.filter((f) => {
      const subs = f.issues?.filter(
        (s) => s.assignee === this.current_assignee
      );

      if (f.assignee !== this.current_assignee && !subs?.length) {
        return false;
      }

      f.issues = subs;
      return true;
    });
  }
  private _getIssueByFeature(issues: IBoardIssue[]): IBoardIssue[] {
    console.log("_getIssueByFeature", this.current_feature);
    return issues.filter((f) => {
      if (f.parent_id !== this.current_feature) return false;
      return true;
    });
  }
  private _getIssueByStatus(issues: IBoardIssue[]): IBoardIssue[] {
    console.log("_getIssueByStatus", this.current_status);
    return issues.filter((f) => {
      const subs = f.issues?.filter((s) => s.status === this.current_status);

      if (f.status !== this.current_status && !subs?.length) {
        return false;
      }

      f.issues = subs;
      return true;
    });
  }
  private _getIssueByHidden(issues: IBoardIssue[]): IBoardIssue[] {
    console.log("_getIssueByHidden", this.current_hidden);

    return issues.filter((f) => {
      const subs = this.current_hidden.find((fd) => fd === IssueType.subs)
        ? []
        : f.issues;

      if (this.current_hidden.find((fd) => fd === f.type)) {
        return false;
      }

      f.issues = subs;
      return true;
    });
  }

  getStatusAndItemsCount(): IStatus[] {
    const issues = this._filter();

    const count_issue = (issue: IBoardIssue, status: string) => {
      let count = 0;
      if (issue.status === status) count++;
      count += issue.issues?.filter((f) => f.status === status)?.length ?? 0;
      return count;
    };

    let x = issues
      .map((d) => ({
        id: this._getStatusOrder(d.status),
        status: d.status ?? "",
        count: issues
          .filter(
            (f) =>
              f.status === d.status ||
              f.issues?.find((ff) => ff.status === d.status)
          )
          .map((m) => count_issue(m, d.status ?? ""))
          .reduce((p, c) => p + c, 0),
      }))
      .reduce((p, c) => {
        const current = p.find((f) => f.status === c.status);
        if (current) {
          p = p.filter((f) => f.status !== c.status);
        }
        p.push(c);
        return p;
      }, this._getDefaultVisibleStatus())
      .sort((a, b) => a.id.localeCompare(b.id));

    return x;
  }

  private _getStatusOrder(status?: string) {
    switch (status) {
      case IssueStatus.A_FAZER:
        return "0";
      case IssueStatus.EM_REFINAMENTO:
        return "1";
      case IssueStatus.EM_EXECUCAO:
        return "2";
      case IssueStatus.EM_TESTES:
        return "3";
      case IssueStatus.ENCERRADO_ATIVADO:
        return "7";
      case IssueStatus.CANCELADO:
        return "8";
      default:
        return "9";
    }
  }

  private _getDefaultVisibleStatus(): {
    status: string;
    id: string;
    count: number;
  }[] {
    return [
      {
        id: "0",
        status: IssueStatus.A_FAZER,
        count: 0,
      },
      {
        id: "2",
        status: IssueStatus.EM_EXECUCAO,
        count: 0,
      },
      {
        id: "3",
        status: IssueStatus.EM_TESTES,
        count: 0,
      },
      {
        id: "7",
        status: IssueStatus.ENCERRADO_ATIVADO,
        count: 0,
      },
    ];
  }

  private _getHash(value: string): string {
    var hash = 0,
      i,
      chr;
    if (value.length === 0) return hash.toString();
    for (i = 0; i < value.length; i++) {
      chr = value.charCodeAt(i);
      hash = (hash << 5) - hash + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return "I" + hash.toString();
  }
}
