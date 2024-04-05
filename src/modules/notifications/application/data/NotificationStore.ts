import { BehaviorSubject } from "rxjs";
import { v4 as uuidv4 } from "uuid";

import { ComponentEnum, StyleEnum } from "./NotificationTypes";
import { NotificationModel } from "./NotificationModel";
import dateHelper from "../../../../helpers/date.helper";

const dt_st = new Date();
const dt_ed = new Date();
dt_ed.setDate(dt_st.getDate() + 7);
const st = dateHelper.format(dt_st, "yyyy-MM-dd");
const ed = dateHelper.format(dt_ed, "yyyy-MM-dd");

const initialState: NotificationModel = {
  id: uuidv4().split("-")[0], // uuid first part
  v: 1, // versão
  cp: ComponentEnum.Banner, // componente
  t: StyleEnum.Info, // tipo
  m: "", // mensagem
  mf: [], // microfrontends
  fx: 0,
  st: st,
  sth: "00:00",
  ed: ed,
  edh: "23:59",
};

export default class NotificationStore {
  private _current: BehaviorSubject<NotificationModel> = new BehaviorSubject(
    initialState,
  );
  get current$() {
    return this._current.asObservable();
  }
  get current() {
    return this._current.value;
  }

  updateCurrent(model: NotificationModel) {
    this._current.next(model);
  }
}
