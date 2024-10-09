import { BehaviorSubject } from "rxjs";

import InputDataModel from "./InputDataModel";

const initialState = () => new InputDataModel("{}");

export default class InputDataStore {
  private _current: BehaviorSubject<InputDataModel> = new BehaviorSubject(
    initialState(),
  );
  get current$() {
    return this._current.asObservable();
  }
  get current() {
    return this._current.value;
  }

  updateCurrent(model: InputDataModel) {
    this._current.next(model);
  }
}
