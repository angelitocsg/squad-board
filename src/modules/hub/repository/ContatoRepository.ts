import { Observable } from "rxjs";

import Contato from "../domain/Contato";
import ContatoDTO from "./ContatoDTO";

export type TFilter = {};

export default interface ContatoRepository {
  data$: Observable<Contato[]>;
  getAll: (filter?: TFilter) => Contato[];
  export: () => ContatoDTO[];
  getById: (AcessoId: string) => Contato | undefined;
  create: (entity: Contato) => Contato;
  update: (id: string, entity: Contato) => Contato;
  delete: (id: string) => void;
}
