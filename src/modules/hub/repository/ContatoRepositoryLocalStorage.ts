import { BehaviorSubject, map } from "rxjs";

import { StorageKey } from "../../../enums/StorageKey";
import Contato from "../domain/Contato";
import ContatoDTO from "./ContatoDTO";
import ContatoRepository, { TFilter } from "./ContatoRepository";

export default class ContatoRepositoryLocalStorage
  implements ContatoRepository
{
  private _data: BehaviorSubject<ContatoDTO[]> = new BehaviorSubject<
    ContatoDTO[]
  >([]);

  private get data() {
    return this._data.value.sort((a, b) =>
      a.nome.localeCompare(b.nome),
    );
  }

  get data$() {
    return this._data
      .asObservable()
      .pipe(map((items) => items.map((item) => ContatoDTO.toDomain(item))));
  }

  private load() {
    this._data.next(
      JSON.parse(localStorage.getItem(StorageKey.DATA_HUB_CONTATOS) ?? "[]"),
    );
  }

  private save() {
    localStorage.setItem(
      StorageKey.DATA_HUB_CONTATOS,
      JSON.stringify(this.data ?? []),
    );
  }

  getAll(filter?: TFilter) {
    this.load();
    return this.data.map((item) => ContatoDTO.toDomain(item));
  }

  export() {
    this.load();
    return this.data;
  }

  getById(id: string) {
    this.load();
    const itemDTO = this.data.find((item) => item.id === id);
    return itemDTO ? ContatoDTO.toDomain(itemDTO) : undefined;
  }

  create(entity: Contato) {
    this.load();
    const updated = this.data;
    updated.push(new ContatoDTO(entity));
    this._data.next(updated);
    this.save();
    return entity;
  }

  update(id: string, entity: Contato) {
    this.load();
    const updated = this.data.filter((item) => item.id !== id);
    updated.push(new ContatoDTO(entity));
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
