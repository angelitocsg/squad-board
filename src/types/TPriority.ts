import { PriorityEnum } from "../enums/PriorityEnum";

export type TPriority =
  | PriorityEnum.VERY_LOW
  | PriorityEnum.LOW
  | PriorityEnum.MEDIUM
  | PriorityEnum.HIGH
  | PriorityEnum.VERY_HIGH;
