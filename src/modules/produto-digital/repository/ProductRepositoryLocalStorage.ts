import { BehaviorSubject, map } from "rxjs";

import { StorageKey } from "../../../enums/StorageKey";
import Product from "../domain/Product";
import ProductDTO from "./ProductDTO";
import ProductRepository, { TFilter } from "./ProductRepository";

export default class ProductRepositoryLocalStorage implements ProductRepository {
  private _data: BehaviorSubject<ProductDTO[]> = new BehaviorSubject<ProductDTO[]>([]);

  private get data() {
    return this._data.value.sort((a, b) =>
      `${a.sigla}-${a.disabled ? 1 : -1}-${a.name}`.localeCompare(
        `${b.sigla}-${b.disabled ? 1 : -1}-${b.name}`,
      ),
    );
  }

  get data$() {
    return this._data
      .asObservable()
      .pipe(map(items => items.map(item => ProductDTO.toDomain(item))));
  }

  private load() {
    this._data.next(JSON.parse(localStorage.getItem(StorageKey.DATA_PROD_DIGITAL) ?? "[]"));
  }

  private save() {
    localStorage.setItem(StorageKey.DATA_PROD_DIGITAL, JSON.stringify(this.data ?? []));
  }

  getAll(filter?: TFilter) {
    this.load();
    return this.data.map(itemDTO => ProductDTO.toDomain(itemDTO));
  }

  getById(id: string) {
    this.load();
    const itemDTO = this.data.find(item => item.id === id);
    return itemDTO ? ProductDTO.toDomain(itemDTO) : undefined;
  }

  create(entity: Product) {
    this.load();
    const updated = this.data;
    updated.push(new ProductDTO(entity));
    this._data.next(updated);
    this.save();
    return entity;
  }

  update(id: string, entity: Product) {
    this.load();
    const updated = this.data.filter(item => item.id !== id);
    updated.push(new ProductDTO(entity));
    this._data.next(updated);
    this.save();
    return entity;
  }

  delete(id: string) {
    this.load();
    this._data.next(this.data.filter(g => g.id !== id));
    this.save();
  }
}
