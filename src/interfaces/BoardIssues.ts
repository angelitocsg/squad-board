export interface BoardIssues {
  id?: string;
  parent_id?: string;
  parent_description?: string;
  type?: "feature" | "story" | "task" | "bug";
  assignee: string;
  status?: string;
  description?: string;
  priority?: "low" | "medium" | "high";
  sprint_name?: string;
  squad_name?: string;
  issues?: BoardIssues[];
  story_points?: number;
}

export type TFeatureType =
  | "feature"
  | "story"
  | "task"
  | "sub-task"
  | "bug"
  | "sub-bug"
  | "other";

export type TPriority = "low" | "medium" | "high";
