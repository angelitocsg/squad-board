import {
  TComponent,
  TBannerStyle,
  TModalStyle,
  BehaviorEnum,
} from "../domain/NotificationTypes";
import Notificacao from "../domain/Notificacao";

export default class NotificacaoDTO {
  id!: string;
  cp!: TComponent;
  t!: TBannerStyle | TModalStyle;
  m!: string;
  mf!: string[];
  fx!: BehaviorEnum;
  pg!: string;
  op!: string;
  lk!: string;
  rcm!: number;
  st!: string;
  sth!: string;
  ed!: string;
  edh!: string;
  tit!: string;
  txb!: string;
  chk!: string;

  constructor(entity: Notificacao) {
    this.id = entity.id;
    this.cp = entity.cp;
    this.t = entity.t;
    this.m = entity.m;
    this.mf = entity.mf;
    this.fx = entity.fx;
    this.pg = entity.pg;
    this.op = entity.op;
    this.lk = entity.lk;
    this.rcm = entity.rcm;
    this.st = entity.st;
    this.sth = entity.sth;
    this.ed = entity.ed;
    this.edh = entity.edh;
    this.tit = entity.tit;
    this.txb = entity.txb;
    this.chk = entity.chk;
  }

  static toDomain(dto: NotificacaoDTO) {
    return Notificacao.restore(
      dto.id,
      dto.cp,
      dto.t,
      dto.m,
      dto.mf,
      dto.fx,
      dto.pg,
      dto.op,
      dto.lk,
      dto.rcm,
      dto.st,
      dto.sth,
      dto.ed,
      dto.edh,
      dto.tit,
      dto.txb,
      dto.chk,
    );
  }
}
