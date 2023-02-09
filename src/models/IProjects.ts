import { IProjectRepository } from "./IProjectRepository";

export interface IProject {
  id?: string;
  name?: string;
  description?: string;
  repositories?: IProjectRepository[];
}
