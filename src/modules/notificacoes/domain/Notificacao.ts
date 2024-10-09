import {
  BehaviorEnum,
  TBannerStyle,
  TComponent,
  TModalStyle,
} from "./NotificationTypes";
import { v4 as uuidv4 } from "uuid";

export default class Notificacao {
  private _id: string = ""; // uuid first part
  get id() {
    return this._id;
  }
  private _cp: TComponent; // componente
  get cp() {
    return this._cp;
  }
  private _t: TBannerStyle | TModalStyle; // tipo
  get t() {
    return this._t;
  }
  private _m: string; // mensagem
  get m() {
    return this._m;
  }
  private _mf: string[]; // microfrontends
  get mf() {
    return this._mf;
  }
  private _fx: BehaviorEnum; // comportamento
  get fx() {
    return this._fx;
  }
  private _pg: string; // rota dentro do MFE
  get pg() {
    return this._pg;
  }
  private _op: string; // operação dentro do MFE
  get op() {
    return this._op;
  }
  private _lk: string; // redirecionar para link/ação ao clicar
  get lk() {
    return this._lk;
  }
  private _rcm: number; // Reexibir a cada x minutos
  get rcm() {
    return this._rcm;
  }
  private _st: string; // data inicio
  get st() {
    return this._st;
  }
  private _sth: string; // hora inicio
  get sth() {
    return this._sth;
  }
  private _ed: string; // data fim
  get ed() {
    return this._ed;
  }
  private _edh: string; // hora fim
  get edh() {
    return this._edh;
  }
  private _tit: string; // titulo
  get tit() {
    return this._tit;
  }
  private _txb: string; // texto botão
  get txb() {
    return this._txb;
  }
  private _chk: string; // texto checkbox
  get chk() {
    return this._chk;
  }

  private constructor(
    id: string,
    cp: TComponent,
    t: TBannerStyle | TModalStyle,
    m: string,
    mf: string[],
    fx: BehaviorEnum,
    pg?: string,
    op?: string,
    lk?: string,
    rcm?: number,
    st?: string,
    sth?: string,
    ed?: string,
    edh?: string,
    tit?: string,
    txb?: string,
    chk?: string,
  ) {
    this._id = id;
    this._cp = cp;
    this._t = t;
    this._m = m;
    this._mf = mf;
    this._fx = fx;
    this._pg = pg ?? "";
    this._op = op ?? "";
    this._lk = lk ?? "";
    this._rcm = rcm ?? 0;
    this._st = st ?? "";
    this._sth = sth ?? "";
    this._ed = ed ?? "";
    this._edh = edh ?? "";
    this._tit = tit ?? "";
    this._txb = txb ?? "";
    this._chk = chk ?? "";
  }

  updateId(id: string): Notificacao {
    if (!id) throw Error("Id is empty");
    this._id = id;
    return this;
  }

  static create(
    cp: TComponent,
    t: TBannerStyle | TModalStyle,
    m: string,
    mf: string[],
    fx: BehaviorEnum,
    pg?: string,
    op?: string,
    lk?: string,
    rcm?: number,
    st?: string,
    sth?: string,
    ed?: string,
    edh?: string,
    tit?: string,
    txb?: string,
    chk?: string,
  ) {
    if (!m) throw Error("Mensagem deve ser informada");
    const id = uuidv4().split("-")[0];
    return new Notificacao(
      id,
      cp,
      t,
      m,
      mf,
      fx,
      pg,
      op,
      lk,
      rcm,
      st,
      sth,
      ed,
      edh,
      tit,
      txb,
      chk,
    );
  }

  static restore(
    id: string,
    cp: TComponent,
    t: TBannerStyle | TModalStyle,
    m: string,
    mf: string[],
    fx: BehaviorEnum,
    pg?: string,
    op?: string,
    lk?: string,
    rcm?: number,
    st?: string,
    sth?: string,
    ed?: string,
    edh?: string,
    tit?: string,
    txb?: string,
    chk?: string,
  ) {
    if (!m) throw Error("Mensagem deve ser informada");
    return new Notificacao(
      id,
      cp,
      t,
      m,
      mf,
      fx,
      pg,
      op,
      lk,
      rcm,
      st,
      sth,
      ed,
      edh,
      tit,
      txb,
      chk,
    );
  }
}
