import { Observable } from "rxjs";

import Gmud from "../domain/Gmud";
import GmudDTO from "./GmudDTO";

export type TFilter = {
  repositoryId?: string;
  dateFrom?: string;
  dateTo?: string;
};

export default interface GmudRepository {
  data$: Observable<Gmud[]>;
  getAll: (filter?: TFilter) => Gmud[];
  export: () => GmudDTO[];
  getById: (id: string) => Gmud | undefined;
  getByNumber: (number: string) => Gmud | undefined;
  getByStory: (story: string) => Gmud | undefined;
  create: (entity: Gmud) => Gmud;
  update: (id: string, entity: Gmud) => Gmud;
  cancel: (id: string) => void;
  delete: (id: string) => void;
}
