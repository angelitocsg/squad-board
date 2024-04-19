export enum EnvStatusType {
  DEFAULT = "light",
  CANCELED = "secondary",
  PENDING = "warning",
  PUBLISHED = "success",
  FAIL = "danger",
}

export type TEnvStatus =
  | EnvStatusType.DEFAULT
  | EnvStatusType.CANCELED
  | EnvStatusType.PENDING
  | EnvStatusType.PUBLISHED
  | EnvStatusType.FAIL;
