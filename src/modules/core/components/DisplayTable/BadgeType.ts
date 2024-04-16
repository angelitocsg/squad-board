export enum BadgeType {
  NONE = "",
  DEFAULT = "light",
  PRIMARY = "primary",
  SECONDARY = "secondary",
  WARNING = "warning",
  DANGER = "danger",
  SUCCESS = "success",
}

export type TBadge =
  | BadgeType.NONE
  | BadgeType.DEFAULT
  | BadgeType.PRIMARY
  | BadgeType.SECONDARY
  | BadgeType.WARNING
  | BadgeType.DANGER
  | BadgeType.SUCCESS;
