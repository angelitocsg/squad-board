import { TIssueType } from "../types/TIssueType";
import { TPriority } from "../types/TPriority";

export interface IBoardIssue {
  id?: string;
  parent_id?: string;
  parent_description?: string;
  type?: TIssueType;
  assignee: string;
  status?: string;
  description?: string;
  priority?: TPriority;
  sprint_name?: string;
  squad_name?: string;
  issues?: IBoardIssue[];
  story_points?: number;
}
