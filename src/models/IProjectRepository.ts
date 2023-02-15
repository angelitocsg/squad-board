import { IProjectEnvironments } from "./IProjectEnvironment";
import { IProjectGmud } from "./IProjectGmud";

export interface IProjectRepository {
  id: string;
  type: string;
  deploy_sequence: string;
  blocks?: string;
  sigla_app?: string;
  environments: {
    develop: IProjectEnvironments;
    homolog: IProjectEnvironments;
    production: IProjectEnvironments;
  };
  gmuds?: IProjectGmud[];

  projectId?: string;
}
