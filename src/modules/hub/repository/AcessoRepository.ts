import { Observable } from "rxjs";

import Acesso from "../domain/Acesso";
import AcessoDTO from "./AcessoDTO";

export type TFilter = {};

export default interface AcessoRepository {
  data$: Observable<Acesso[]>;
  getAll: (filter?: TFilter) => Acesso[];
  export: () => AcessoDTO[];
  getById: (AcessoId: string) => Acesso | undefined;
  create: (entity: Acesso) => Acesso;
  update: (id: string, entity: Acesso) => Acesso;
  delete: (id: string) => void;
}
