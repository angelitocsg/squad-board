import { BehaviorSubject, map } from "rxjs";

import { StorageKey } from "../../../enums/StorageKey";
import Repo from "../domain/Repo";
import RepoDTO from "./RepoDTO";
import RepoRepository, { TFilterRepo } from "./RepoRepository";

export default class RepoRepositoryLocalStorage implements RepoRepository {
  private _data: BehaviorSubject<RepoDTO[]> = new BehaviorSubject<RepoDTO[]>(
    [],
  );

  private get data() {
    return this._data.value.sort((a, b) =>
      `${a.productId}-${a.repository}`.localeCompare(
        `${b.productId}-${b.repository}`,
      ),
    );
  }

  get data$() {
    return this._data
      .asObservable()
      .pipe(map((items) => items.map((item) => RepoDTO.toDomain(item))));
  }

  private load() {
    this._data.next(
      JSON.parse(localStorage.getItem(StorageKey.DATA_REPOSITORIOS) ?? "[]"),
    );
  }

  private save() {
    localStorage.setItem(
      StorageKey.DATA_REPOSITORIOS,
      JSON.stringify(this.data ?? []),
    );
  }

  getAll(filter?: TFilterRepo) {
    this.load();
    if (filter?.productId) {
      this._data.next(
        this.data
          .filter((f) => f.productId === filter.productId)
          .map((itemDTO) => RepoDTO.toDomain(itemDTO)),
      );
    }
    return this.data.map((itemDTO) => RepoDTO.toDomain(itemDTO));
  }

  export() {
    this.load();
    return this.data;
  }

  getById(id: string) {
    this.load();
    const itemDTO = this.data.find((item) => item.id === id);
    return itemDTO ? RepoDTO.toDomain(itemDTO) : undefined;
  }

  create(entity: Repo) {
    this.load();
    const updated = this.data;
    updated.push(new RepoDTO(entity));
    this._data.next(updated);
    this.save();
    return entity;
  }

  update(id: string, entity: Repo) {
    this.load();
    const updated = this.data.filter((item) => item.id !== id);
    updated.push(new RepoDTO(entity));
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
