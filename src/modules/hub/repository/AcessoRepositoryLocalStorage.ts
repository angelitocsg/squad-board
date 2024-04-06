import { BehaviorSubject, map } from "rxjs";

import { StorageKey } from "../../../enums/StorageKey";
import Acesso from "../domain/Acesso";
import AcessoDTO from "./AcessoDTO";
import AcessoRepository, { TFilter } from "./AcessoRepository";

export default class AcessoRepositoryLocalStorage implements AcessoRepository {
  private _data: BehaviorSubject<AcessoDTO[]> = new BehaviorSubject<
    AcessoDTO[]
  >([]);

  private get data() {
    return this._data.value.sort((a, b) =>
      a.apiKey.localeCompare(b.apiKey),
    );
  }

  get data$() {
    return this._data
      .asObservable()
      .pipe(map((items) => items.map((item) => AcessoDTO.toDomain(item))));
  }

  private load() {
    this._data.next(
      JSON.parse(localStorage.getItem(StorageKey.DATA_HUB_ACESSOS) ?? "[]"),
    );
  }

  private save() {
    localStorage.setItem(
      StorageKey.DATA_HUB_ACESSOS,
      JSON.stringify(this.data ?? []),
    );
  }

  getAll(filter?: TFilter) {
    this.load();
    return this.data.map((item) => AcessoDTO.toDomain(item));
  }

  export() {
    this.load();
    return this.data;
  }

  getById(id: string) {
    this.load();
    const itemDTO = this.data.find((item) => item.id === id);
    return itemDTO ? AcessoDTO.toDomain(itemDTO) : undefined;
  }

  create(entity: Acesso) {
    this.load();
    const updated = this.data;
    updated.push(new AcessoDTO(entity));
    this._data.next(updated);
    this.save();
    return entity;
  }

  update(id: string, entity: Acesso) {
    this.load();
    const updated = this.data.filter((item) => item.id !== id);
    updated.push(new AcessoDTO(entity));
    this._data.next(updated);
    this.save();
    return entity;
  }

  delete(id: string) {
    this.load();
    this._data.next(this.data.filter((item) => item.id !== id));
    this.save();
  }
}
