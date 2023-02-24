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

export enum EnvironmentEnum {
  DEVELOP = "develop",
  HOMOLOG = "homolog",
  PRODUCTION = "production",
}

export type TEnvironment =
  | EnvironmentEnum.DEVELOP
  | EnvironmentEnum.HOMOLOG
  | EnvironmentEnum.PRODUCTION;
