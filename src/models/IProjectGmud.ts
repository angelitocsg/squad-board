import { TGmudStatus } from "../types/TGmudStatus";

export interface IProjectGmud {
  number?: string;
  story?: string;
  date?: string;
  time?: string;
  link?: string;
  status?: TGmudStatus;
  description?: string;

  projectId?: string;
  repositoryId?: string;
}
