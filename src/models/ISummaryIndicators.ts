import { TGmudStatus } from "../types/TGmudStatus";

export interface ISummaryIndicators {
  gmuds?: ISummaryIndicatorsGmuds[];
}

export interface ISummaryIndicatorsGmuds {
  status?: TGmudStatus;
  order: number;
  count: number;
}
