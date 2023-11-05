import { BehaviorSubject, map } from "rxjs";

import { StorageKey } from "../../../enums/StorageKey";
import Sigla from "../domain/Sigla";
import SiglaDTO from "./SiglaDTO";
import SiglaRepository, { TFilter } from "./SiglaRepository";

export default class SiglaRepositoryLocalStorage implements SiglaRepository {
  private _data: BehaviorSubject<SiglaDTO[]> = new BehaviorSubject<SiglaDTO[]>(
    [],
  );

  private get data() {
    return this._data.value.sort((a, b) => a.id.localeCompare(b.id));
  }

  get data$() {
    return this._data
      .asObservable()
      .pipe(map((items) => items.map((item) => SiglaDTO.toDomain(item))));
  }

  private load() {
    this._data.next(
      JSON.parse(localStorage.getItem(StorageKey.DATA_SIGLA) ?? "[]"),
    );
  }

  private save() {
    localStorage.setItem(
      StorageKey.DATA_SIGLA,
      JSON.stringify(this.data ?? []),
    );
  }

  getAll(filter?: TFilter) {
    this.load();
    return this.data.map((itemDTO) => SiglaDTO.toDomain(itemDTO));
  }

  getById(id: string) {
    this.load();
    const itemDTO = this.data.find((item) => item.id === id);
    return itemDTO ? SiglaDTO.toDomain(itemDTO) : undefined;
  }

  create(entity: Sigla) {
    this.load();
    const updated = this.data;
    updated.push(new SiglaDTO(entity));
    this._data.next(updated);
    this.save();
    return entity;
  }

  update(id: string, entity: Sigla) {
    this.load();
    const updated = this.data.filter((item) => item.id !== id);
    updated.push(new SiglaDTO(entity));
    this._data.next(updated);
    this.save();
    return entity;
  }

  delete(id: string) {
    this.load();
    this._data.next(this.data.filter((g) => g.id !== id));
    this.save();
  }
}
