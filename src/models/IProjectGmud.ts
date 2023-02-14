import { TGmudStatus } from "../types/TGmudStatus";

export interface IProjectGmud {
  number?: string;
  story?: string;
  date?: string;
  time?: string;
  link?: string;
  status?: TGmudStatus;
  description?: string;
  version?: string;

  projectId?: string;
  repositoryId?: string;
}
