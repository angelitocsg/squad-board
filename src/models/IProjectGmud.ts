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
  owner?: string;

  projectId?: string;
  projectName?: string;
  repositoryId?: string;
}
