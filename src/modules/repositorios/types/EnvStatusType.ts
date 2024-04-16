export enum EnvStatusType {
  NONE = "",
  DEFAULT = "light",
  CANCELED = "secondary",
  PENDING = "warning",
  FAIL = "danger",
  PUBLISHED = "success",
}

export type TEnvStatus =
  | EnvStatusType.NONE
  | EnvStatusType.DEFAULT
  | EnvStatusType.CANCELED
  | EnvStatusType.PENDING
  | EnvStatusType.FAIL
  | EnvStatusType.PUBLISHED;
