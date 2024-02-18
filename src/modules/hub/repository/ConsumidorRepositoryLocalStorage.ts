import { BehaviorSubject, map } from "rxjs";

import { StorageKey } from "../../../enums/StorageKey";
import Consumidor from "../domain/Consumidor";
import ConsumidorDTO from "./ConsumidorDTO";
import ConsumidorRepository, { TFilter } from "./ConsumidorRepository";

export default class ConsumidorRepositoryLocalStorage
  implements ConsumidorRepository
{
  private _data: BehaviorSubject<ConsumidorDTO[]> = new BehaviorSubject<
    ConsumidorDTO[]
  >([]);

  private get data() {
    return this._data.value.sort((a, b) =>
      a.nomeFantasia.localeCompare(b.nomeFantasia),
    );
  }

  get data$() {
    return this._data
      .asObservable()
      .pipe(map((items) => items.map((item) => ConsumidorDTO.toDomain(item))));
  }

  private load() {
    this._data.next(
      JSON.parse(
        localStorage.getItem(StorageKey.DATA_HUB_CONSUMIDORES) ?? "[]",
      ),
    );
  }

  private save() {
    localStorage.setItem(
      StorageKey.DATA_HUB_CONSUMIDORES,
      JSON.stringify(this.data ?? []),
    );
  }

  getAll(filter?: TFilter) {
    this.load();
    return this.data.map((item) => ConsumidorDTO.toDomain(item));
  }

  export() {
    this.load();
    return this.data;
  }

  getById(id: string) {
    this.load();
    const itemDTO = this.data.find((item) => item.id === id);
    return itemDTO ? ConsumidorDTO.toDomain(itemDTO) : undefined;
  }

  create(entity: Consumidor) {
    this.load();
    const updated = this.data;
    updated.push(new ConsumidorDTO(entity));
    this._data.next(updated);
    this.save();
    return entity;
  }

  update(id: string, entity: Consumidor) {
    this.load();
    const updated = this.data.filter((item) => item.id !== id);
    updated.push(new ConsumidorDTO(entity));
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
