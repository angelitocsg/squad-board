import { BehaviorSubject } from "rxjs";
import SiglaModel from "./SiglaModel";

const initialState = new SiglaModel();

export default class SiglaStore {
  private _current: BehaviorSubject<SiglaModel> = new BehaviorSubject(
    initialState
  );
  get current$() {
    return this._current.asObservable();
  }
  get current() {
    return this._current.value;
  }

  updateCurrent(model: SiglaModel) {
    this._current.next(model);
  }
}
