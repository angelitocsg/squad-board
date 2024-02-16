import { BehaviorSubject } from "rxjs";
import ContatoModel from "./ContatoModel";

const initialState = new ContatoModel();

export default class ContatoStore {
  private _current: BehaviorSubject<ContatoModel> = new BehaviorSubject(
    initialState
  );
  get current$() {
    return this._current.asObservable();
  }
  get current() {
    return this._current.value;
  }

  updateCurrent(model: ContatoModel) {
    this._current.next(model);
  }
}
