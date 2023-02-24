import { TPriority } from "../interfaces/BoardIssues";

export interface IOverview {
  features?: IOverviewFeatures[];
  members: IMember[];
  tasks: IOverviewTask[];
}

export interface IOverviewFeatures {
  name: string;
}

export interface IOverviewTask {
  id: string;
  order: number;
  priority?: TPriority;
  summary?: string;
  description?: string;
  user?: string;
}

export interface IMember {
  user: string;
  name: string;
  skill?: SkillEnum;
}

export enum SkillEnum {
  BACKEND = "backend",
  FRONTEND = "frontend",
  FULLSTACK = "fullstack",
  CX = "cx",
}
