import { BehaviorSubject, map } from "rxjs";

import { StorageKey } from "../../../../enums/StorageKey";
import GmudDAO, { TFilter } from "../../application/repository/GmudDAO";
import Gmud from "../../domain/entity/Gmud";
import GmudDTO from "./GmudDTO";
import { GmudStatus } from "../../../../enums/GmudStatus";

export default class GmudDAOLocalStorage implements GmudDAO {
  private _data: BehaviorSubject<GmudDTO[]> = new BehaviorSubject<GmudDTO[]>(
    []
  );

  private get data() {
    return this._data.value;
  }

  get data$() {
    return this._data
      .asObservable()
      .pipe(map((gmuds) => gmuds.map((gmud) => GmudDTO.toDomain(gmud))));
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
    return this.data.map((gmud) => GmudDTO.toDomain(gmud));
  }

  getById(id: string) {
    this.load();
    const gmud = this.data.find((gmud) => gmud.id === id);
    return gmud ? GmudDTO.toDomain(gmud) : undefined;
  }

  getByNumber(number: string) {
    this.load();
    const gmud = this.data.find((gmud) => gmud.number === number);
    return gmud ? GmudDTO.toDomain(gmud) : undefined;
  }

  getByStory(story: string) {
    this.load();
    const gmud = this.data.find((gmud) => gmud.story === story);
    return gmud ? GmudDTO.toDomain(gmud) : undefined;
  }

  create(gmud: Gmud) {
    this.load();
    const updated = this.data;
    updated.push(new GmudDTO(gmud.id, gmud));
    this._data.next(updated);
    this.save();
    return gmud;
  }

  update(id: string, gmud: Gmud) {
    this.load();
    const updated = this.data.filter((gmud) => gmud.id !== id);
    updated.push(new GmudDTO(id, gmud));
    this._data.next(updated);
    this.save();
    return gmud;
  }

  cancel(id: string) {
    this.load();
    const updated = this.data.map((gmud) =>
      gmud.id === id ? { ...gmud, status: GmudStatus.CANCELADA } : gmud
    );
    this._data.next(updated);
    this.save();
  }

  delete(id: string) {
    this.load();
    this._data.next(this.data.filter((g) => g.id !== id));
    this.save();
  }
}
