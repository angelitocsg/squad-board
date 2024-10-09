import { Observable } from "rxjs";

import MfeDTO from "./MfeDTO";

export type TFilter = {
  repositoryId?: string;
  dateFrom?: string;
  dateTo?: string;
};

export default interface ListaMfeRepository {
  data$: Observable<MfeDTO[]>;
  getAll: () => MfeDTO[];
  update: (entities: MfeDTO[]) => MfeDTO[];
}
