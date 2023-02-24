export interface BoardIssues {
  id?: string;
  parent_id?: string;
  parent_description?: string;
  type?: "feature" | "story" | "task" | "bug";
  assignee: string;
  status?: string;
  description?: string;
  priority?: TPriority;
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

export enum PriorityEnum {
  VERY_LOW = "very-low",
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  VERY_HIGH = "very-high",
}

export type TPriority =
  | PriorityEnum.VERY_LOW
  | PriorityEnum.LOW
  | PriorityEnum.MEDIUM
  | PriorityEnum.HIGH
  | PriorityEnum.VERY_HIGH;
