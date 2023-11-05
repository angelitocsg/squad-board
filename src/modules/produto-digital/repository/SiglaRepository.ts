import { Observable } from "rxjs";
import Sigla from "../domain/Sigla";

export type TFilter = {
  sigla?: string;
};

export default interface SiglaRepository {
  data$: Observable<Sigla[]>;
  getAll: (filter?: TFilter) => Sigla[];
  getById: (id: string) => Sigla | undefined;
  create: (entity: Sigla) => Sigla;
  update: (id: string, entity: Sigla) => Sigla;
  delete: (id: string) => void;
}
