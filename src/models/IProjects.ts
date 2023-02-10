import { IGithubApi } from "./IGithubApi";
import { IProjectRepository } from "./IProjectRepository";

export interface IProject {
  id?: string;
  name?: string;
  description?: string;
  repositories?: IProjectRepository[];
  github? : IGithubApi;
}
