import { TBannerStyle, TComponent, TModalStyle } from "./NotificationTypes";

export interface NotificationModel {
  id: string; // uuid first part
  v: number; // versão
  cp: TComponent; // componente
  t: TBannerStyle | TModalStyle; // tipo
  m: string; // mensagem
  mf: string[]; // microfrontends
  pg?: string; // rota dentro do MFE
  op?: string; // operação dentro do MFE
  lk?: string; // redirecionar para link/ação ao clicar
  rcm?: number; // Reexibir a cada x minutos
  st?: string; // data inicio
  sth?: string; // hora inicio
  ed?: string; // data fim
  edh?: string; // hora fim
  fx: 0 | 1;
  tit?: string; // titulo
  txb?: string; // texto botão
  chk?: string; // texto checkbox
}
