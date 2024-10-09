import { BehaviorSubject } from "rxjs";

import NotificacaoModel from "./NotificacaoModel";

const initialState = () => new NotificacaoModel();

export default class NotificacaoStore {
  private _current: BehaviorSubject<NotificacaoModel> = new BehaviorSubject(
    initialState(),
  );
  get current$() {
    return this._current.asObservable();
  }
  get current() {
    return this._current.value;
  }

  updateCurrent(model: NotificacaoModel) {
    this._current.next(model);
  }
}
