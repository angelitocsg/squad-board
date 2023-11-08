export enum RepositoryType {
  API_APP = "api-app",
  API_INFRA = "api-infra",
  BFF_APP = "bff-app",
  BFF_INFRA = "bff-infra",
  CLOUDFRONT = "cloudfront",
  DEP = "dep",
  GATEWAY = "gateway",
  QUEUE_CONSUMER = "queue-consumer",
  LAMBDA_APP = "lambda-app",
  MFE_APP = "mfe-app",
  MFE_INFRA = "mfe-infra",
  SHARED_INFRA = "shared-infra",
}

export type TRepository =
  | RepositoryType.API_APP
  | RepositoryType.API_INFRA
  | RepositoryType.BFF_APP
  | RepositoryType.BFF_INFRA
  | RepositoryType.CLOUDFRONT
  | RepositoryType.DEP
  | RepositoryType.GATEWAY
  | RepositoryType.QUEUE_CONSUMER
  | RepositoryType.LAMBDA_APP
  | RepositoryType.MFE_APP
  | RepositoryType.MFE_INFRA
  | RepositoryType.SHARED_INFRA;
