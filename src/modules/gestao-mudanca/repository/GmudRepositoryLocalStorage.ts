import { BehaviorSubject, map } from "rxjs";

import { StorageKey } from "../../../enums/StorageKey";
import GmudRepository, { TFilter } from "./GmudRepository";
import Gmud from "../domain/Gmud";
import GmudDTO from "./GmudDTO";
import { GmudStatus } from "../../../enums/GmudStatus";

export default class GmudRepositoryLocalStorage implements GmudRepository {
  private _data: BehaviorSubject<GmudDTO[]> = new BehaviorSubject<GmudDTO[]>(
    []
  );

  private get data() {
    return this._data.value;
  }

  get data$() {
    return this._data
      .asObservable()
      .pipe(map((items) => items.map((item) => GmudDTO.toDomain(item))));
  }

  private load() {
    this._data.next(
      JSON.parse(localStorage.getItem(StorageKey.DATA_GMUD) ?? "[]")
    );
  }

  private save() {
    localStorage.setItem(StorageKey.DATA_GMUD, JSON.stringify(this.data ?? []));
  }

  getAll(filter?: TFilter) {
    this.load();
    return this.data.map((item) => GmudDTO.toDomain(item));
  }

  getById(id: string) {
    this.load();
    const itemDTO = this.data.find((item) => item.id === id);
    return itemDTO ? GmudDTO.toDomain(itemDTO) : undefined;
  }

  getByNumber(number: string) {
    this.load();
    const itemDTO = this.data.find((item) => item.number === number);
    return itemDTO ? GmudDTO.toDomain(itemDTO) : undefined;
  }

  getByStory(story: string) {
    this.load();
    const itemDTO = this.data.find((item) => item.story === story);
    return itemDTO ? GmudDTO.toDomain(itemDTO) : undefined;
  }

  create(entity: Gmud) {
    this.load();
    const updated = this.data;
    updated.push(new GmudDTO(entity));
    this._data.next(updated);
    this.save();
    return entity;
  }

  update(id: string, entity: Gmud) {
    this.load();
    const updated = this.data.filter((item) => item.id !== id);
    updated.push(new GmudDTO(entity));
    this._data.next(updated);
    this.save();
    return entity;
  }

  cancel(id: string) {
    this.load();
    const updated = this.data.map((item) =>
      item.id === id ? { ...item, status: GmudStatus.CANCELADA } : item
    );
    this._data.next(updated);
    this.save();
  }

  delete(id: string) {
    this.load();
    this._data.next(this.data.filter((item) => item.id !== id));
    this.save();
  }
}
