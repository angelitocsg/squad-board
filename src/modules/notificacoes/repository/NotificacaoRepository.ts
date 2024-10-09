import { Observable } from "rxjs";

import Notificacao from "../domain/Notificacao";
import NotificacaoDTO from "./NotificacaoDTO";

export type TFilter = {
  repositoryId?: string;
  dateFrom?: string;
  dateTo?: string;
};

export default interface NotificacaoRepository {
  data$: Observable<Notificacao[]>;
  getAll: (filter?: TFilter) => Notificacao[];
  export: () => NotificacaoDTO[];
  getById: (id: string) => Notificacao | undefined;
  create: (entity: Notificacao) => Notificacao;
  update: (id: string, entity: Notificacao) => Notificacao;
  delete: (id: string) => void;
  clear: () => void;
}
