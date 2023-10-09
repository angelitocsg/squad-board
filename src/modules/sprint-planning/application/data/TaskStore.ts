import { BehaviorSubject } from "rxjs";

import TaskModel from "./TaskModel";

const initialState = new TaskModel();

export default class TaskStore {
  private _current: BehaviorSubject<TaskModel> = new BehaviorSubject(
    initialState,
  );
  get current$() {
    return this._current.asObservable();
  }
  get current() {
    return this._current.value;
  }

  updateCurrent(model: TaskModel) {
    this._current.next(model);
  }
}
