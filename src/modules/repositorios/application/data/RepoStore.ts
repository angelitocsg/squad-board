import { BehaviorSubject } from "rxjs";
import RepoModel from "./RepoModel";

const initialState = new RepoModel();

export default class RepoStore {
  private _current: BehaviorSubject<RepoModel> = new BehaviorSubject(
    initialState
  );
  get current$() {
    return this._current.asObservable();
  }
  get current() {
    return this._current.value;
  }

  updateCurrent(model: RepoModel) {
    this._current.next(model);
  }
}
