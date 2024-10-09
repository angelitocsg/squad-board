import { BehaviorSubject } from "rxjs";

import { StorageKey } from "../../../enums/StorageKey";
import ListaMfeRepository from "./ListaMfeRepository";
import MfeDTO from "./MfeDTO";

export default class ListaMfeRepositoryLocalStorage
  implements ListaMfeRepository
{
  private _data: BehaviorSubject<MfeDTO[]> = new BehaviorSubject<MfeDTO[]>([]);

  private get data() {
    return this._data.value;
  }

  get data$() {
    return this._data.asObservable();
  }

  private load() {
    this._data.next(
      JSON.parse(
        localStorage.getItem(StorageKey.DATA_NOTIFICACOES_CONFIG) ?? "[]",
      ),
    );
  }

  private save() {
    localStorage.setItem(
      StorageKey.DATA_NOTIFICACOES_CONFIG,
      JSON.stringify(this.data ?? []),
    );
  }

  getAll() {
    this.load();
    return this.data;
  }

  update(entities: MfeDTO[]) {
    this.load();
    this._data.next(entities);
    this.save();
    return entities;
  }
}
