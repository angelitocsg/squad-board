export enum StyleEnum {
  Error = "error",
  Warning = "warn",
  Danger = "danger",
  Info = "info",
  Money = "money",
  NoImage = "no_image",
}

export enum ComponentEnum {
  Banner = "banner",
  Modal = "modal",
}

export enum BehaviorEnum {
  UmaVez = 0,
  UmaVezDia = 1,
  Sempre = 2,
  Customizada = 3,
  Indefinida = 99
}

export type TBannerStyle =
  | StyleEnum.Error
  | StyleEnum.Warning
  | StyleEnum.Danger
  | StyleEnum.Info;

export type TModalStyle =
  | StyleEnum.Error
  | StyleEnum.Warning
  | StyleEnum.Danger
  | StyleEnum.Info;

export type TComponent = ComponentEnum.Banner | ComponentEnum.Modal;
