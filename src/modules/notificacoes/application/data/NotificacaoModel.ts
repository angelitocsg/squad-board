import dateHelper from "../../../../helpers/date.helper";
import Notificacao from "../../domain/Notificacao";
import {
  BehaviorEnum,
  ComponentEnum,
  StyleEnum,
  TBannerStyle,
  TComponent,
  TModalStyle,
} from "../../domain/NotificationTypes";

const dt_st = new Date();
const dt_ed = new Date();
dt_ed.setDate(dt_st.getDate() + 7);
const st = dateHelper.format(dt_st, "yyyy-MM-dd");
const ed = dateHelper.format(dt_ed, "yyyy-MM-dd");

export default class NotificacaoModel {
  id: string = ""; // uuid first part
  cp: TComponent = ComponentEnum.Banner; // componente
  t: TBannerStyle | TModalStyle = StyleEnum.Info; // tipo
  m: string = ""; // mensagem
  mf: string[] = []; // microfrontends
  fx: BehaviorEnum = BehaviorEnum.UmaVez;
  pg?: string = ""; // rota dentro do MFE
  op?: string = ""; // operação dentro do MFE
  lk?: string = ""; // redirecionar para link/ação ao clicar
  rcm?: number = 0; // Reexibir a cada x minutos
  st?: string = st; // data inicio
  sth?: string = "00:00"; // hora inicio
  ed?: string = ed; // data fim
  edh?: string = "23:59"; // hora fim
  tit?: string = ""; // titulo
  txb?: string = ""; // texto botão
  chk?: string = ""; // texto checkbox

  static fromDomain(entity: Notificacao): NotificacaoModel {
    return {
      id: entity.id,
      cp: entity.cp,
      t: entity.t,
      m: entity.m,
      mf: entity.mf,
      fx: entity.fx,
      pg: entity.pg,
      op: entity.op,
      lk: entity.lk,
      rcm: entity.rcm,
      st: entity.st,
      sth: entity.sth,
      ed: entity.ed,
      edh: entity.edh,
      tit: entity.tit,
      txb: entity.txb,
      chk: entity.chk,
    };
  }

  static toDomain(model: NotificacaoModel): Notificacao {
    return Notificacao.restore(
      model.id,
      model.cp,
      model.t,
      model.m,
      model.mf,
      model.fx,
      model.pg,
      model.op,
      model.lk,
      model.rcm,
      model.st,
      model.sth,
      model.ed,
      model.edh,
      model.tit,
      model.txb,
      model.chk,
    );
  }
}
