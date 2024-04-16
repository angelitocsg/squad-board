
export enum CellType {
  NONE = "",
  TEXT = "text",
  BADGE = "badge",
  SEMAPHORE = "semaphore",
}

export type TCell =
  | CellType.NONE
  | CellType.TEXT
  | CellType.BADGE
  | CellType.SEMAPHORE;
