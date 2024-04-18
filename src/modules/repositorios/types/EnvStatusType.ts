export enum EnvStatusType {
  NONE = "",
  DEFAULT = "light",
  CANCELED = "secondary",
  PENDING = "warning",
  PUBLISHED = "success",
  FAIL = "danger",
}

export type TEnvStatus =
  | EnvStatusType.NONE
  | EnvStatusType.DEFAULT
  | EnvStatusType.CANCELED
  | EnvStatusType.PENDING
  | EnvStatusType.PUBLISHED
  | EnvStatusType.FAIL;
