import { BehaviorSubject } from "rxjs";
import StoryModel from "./StoryModel";

const initialState = new StoryModel();

export default class StoryStore {
  private _current: BehaviorSubject<StoryModel> = new BehaviorSubject(
    initialState
  );
  get current$() {
    return this._current.asObservable();
  }
  get current() {
    return this._current.value;
  }

  updateCurrent(model: StoryModel) {
    this._current.next(model);
  }
}
