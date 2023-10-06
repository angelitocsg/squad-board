import { BehaviorSubject } from "rxjs";
import ProductModel from "./ProductModel";

const initialState = new ProductModel();

export default class ProductStore {
  private _current: BehaviorSubject<ProductModel> = new BehaviorSubject(
    initialState
  );
  get current$() {
    return this._current.asObservable();
  }
  get current() {
    return this._current.value;
  }

  updateCurrent(model: ProductModel) {
    this._current.next(model);
  }
}
