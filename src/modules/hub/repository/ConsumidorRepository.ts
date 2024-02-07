import { Observable } from "rxjs";

import Consumidor from "../domain/Consumidor";
import ConsumidorDTO from "./ConsumidorDTO";

export type TFilter = {};

export default interface ConsumidorRepository {
  data$: Observable<Consumidor[]>;
  getAll: (filter?: TFilter) => Consumidor[];
  export: () => ConsumidorDTO[];
  getById: (id: string) => Consumidor | undefined;
  create: (entity: Consumidor) => Consumidor;
  update: (id: string, entity: Consumidor) => Consumidor;
  delete: (id: string) => void;
}
