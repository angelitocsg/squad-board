import { BehaviorSubject } from "rxjs";
import ConsumidorModel from "./ConsumidorModel";

const initialState = new ConsumidorModel();

export default class ConsumidorStore {
  private _current: BehaviorSubject<ConsumidorModel> = new BehaviorSubject(
    initialState
  );
  get current$() {
    return this._current.asObservable();
  }
  get current() {
    return this._current.value;
  }

  updateCurrent(model: ConsumidorModel) {
    this._current.next(model);
  }
}
