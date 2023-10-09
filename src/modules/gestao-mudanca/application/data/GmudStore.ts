import { BehaviorSubject } from "rxjs";
import GmudModel from "./GmudModel";

const initialState = new GmudModel();

export default class GmudStore {
  private _current: BehaviorSubject<GmudModel> = new BehaviorSubject(
    initialState
  );
  get current$() {
    return this._current.asObservable();
  }
  get current() {
    return this._current.value;
  }

  updateCurrent(model: GmudModel) {
    this._current.next(model);
  }
}
