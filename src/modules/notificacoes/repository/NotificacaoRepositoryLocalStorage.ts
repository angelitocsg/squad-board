import { BehaviorSubject, map } from "rxjs";

import { StorageKey } from "../../../enums/StorageKey";
import Notificacao from "../domain/Notificacao";
import NotificacaoDTO from "./NotificacaoDTO";
import NotificacaoRepository, { TFilter } from "./NotificacaoRepository";

export default class NotificacaoRepositoryLocalStorage
  implements NotificacaoRepository
{
  private _data: BehaviorSubject<NotificacaoDTO[]> = new BehaviorSubject<
    NotificacaoDTO[]
  >([]);

  private get data() {
    return this._data.value;
  }

  get data$() {
    return this._data
      .asObservable()
      .pipe(map((items) => items.map((item) => NotificacaoDTO.toDomain(item))));
  }

  private load() {
    this._data.next(
      JSON.parse(localStorage.getItem(StorageKey.DATA_NOTIFICACOES) ?? "[]"),
    );
  }

  private save() {
    localStorage.setItem(
      StorageKey.DATA_NOTIFICACOES,
      JSON.stringify(this.data ?? []),
    );
  }

  getAll(filter?: TFilter) {
    this.load();
    return this.data.map((item) => NotificacaoDTO.toDomain(item));
  }

  export() {
    this.load();
    return this.data;
  }

  getById(id: string) {
    this.load();
    const itemDTO = this.data.find((item) => item.id === id);
    return itemDTO ? NotificacaoDTO.toDomain(itemDTO) : undefined;
  }

  create(entity: Notificacao) {
    this.load();
    const updated = this.data;
    updated.push(new NotificacaoDTO(entity));
    this._data.next(updated);
    this.save();
    return entity;
  }

  update(id: string, entity: Notificacao) {
    this.load();
    const updated = this.data.filter((item) => item.id !== id);
    updated.push(new NotificacaoDTO(entity));
    this._data.next(updated);
    this.save();
    return entity;
  }

  delete(id: string) {
    this.load();
    this._data.next(this.data.filter((item) => item.id !== id));
    this.save();
  }

  clear() {
    this._data.next([]);
    this.save();
  }
}
