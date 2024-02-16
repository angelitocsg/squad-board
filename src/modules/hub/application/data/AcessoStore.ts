import { BehaviorSubject } from "rxjs";
import AcessoModel from "./AcessoModel";

const initialState = new AcessoModel();

export default class AcessoStore {
  private _current: BehaviorSubject<AcessoModel> = new BehaviorSubject(
    initialState
  );
  get current$() {
    return this._current.asObservable();
  }
  get current() {
    return this._current.value;
  }

  updateCurrent(model: AcessoModel) {
    this._current.next(model);
  }
}
