import { IGithubApi } from "./IGithubApi";
import { IProjectMonitoring } from "./IProjectMonitoring";
import { IProjectRepository } from "./IProjectRepository";

export interface IProject {
  id?: string;
  name?: string;
  description?: string;
  repositories?: IProjectRepository[];
  github?: IGithubApi;
  monitoring?: IProjectMonitoring[];
}
