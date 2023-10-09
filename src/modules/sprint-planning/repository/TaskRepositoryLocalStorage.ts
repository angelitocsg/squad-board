import { BehaviorSubject, map } from "rxjs";

import { StorageKey } from "../../../enums/StorageKey";
import TaskRepository, { TFilter } from "./TaskRepository";
import Task from "../domain/Task";
import TaskDTO from "./TaskDTO";

export default class TaskRepositoryLocalStorage implements TaskRepository {
  private _data: BehaviorSubject<TaskDTO[]> = new BehaviorSubject<TaskDTO[]>(
    [],
  );

  private get data() {
    return this._data.value.sort(
      (a, b) =>
        (!a.parentId || !b.parentId
          ? -1
          : a.parentId.localeCompare(b.parentId)) ||
        a.title.localeCompare(b.title),
    );
  }

  get data$() {
    return this._data
      .asObservable()
      .pipe(map(items => items.map(item => TaskDTO.toDomain(item))));
  }

  private load() {
    this._data.next(
      JSON.parse(localStorage.getItem(StorageKey.DATA_TASKS) ?? "[]"),
    );
  }

  private save() {
    localStorage.setItem(
      StorageKey.DATA_TASKS,
      JSON.stringify(this.data ?? []),
    );
  }

  getAll(filter?: TFilter) {
    this.load();
    return this.data.map(itemDTO => TaskDTO.toDomain(itemDTO));
  }

  getById(id: string) {
    this.load();
    const itemDTO = this.data.find(item => item.id === id);
    return itemDTO ? TaskDTO.toDomain(itemDTO) : undefined;
  }

  create(entity: Task) {
    this.load();
    const updated = this.data;
    updated.push(new TaskDTO(entity));
    this._data.next(updated);
    this.save();
    return entity;
  }

  update(id: string, entity: Task) {
    this.load();
    const updated = this.data.filter(item => item.id !== id);
    updated.push(new TaskDTO(entity));
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
