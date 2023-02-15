export enum GmudStatus {
  PENDENTE = "PENDENTE",
  PREENCHIDA = "PREENCHIDA",
  EM_APROVACAO = "EM APROVAÇÃO",
  APROVADA = "APROVADA",
  CANCELADA = "CANCELADA",
  AGENDADA = "AGENDADA",
  FALHA = "FALHA",
  EM_REVISAO = "EM REVISÃO",
  PUBLICADA = "PUBLICADA",
}

export type TGmudStatus =
  | GmudStatus.PENDENTE
  | GmudStatus.PREENCHIDA
  | GmudStatus.EM_APROVACAO
  | GmudStatus.APROVADA
  | GmudStatus.CANCELADA
  | GmudStatus.AGENDADA
  | GmudStatus.FALHA
  | GmudStatus.EM_REVISAO
  | GmudStatus.PUBLICADA;

export const GmudStatusOrder = [
  GmudStatus.PENDENTE,
  GmudStatus.PREENCHIDA,
  GmudStatus.EM_APROVACAO,
  GmudStatus.APROVADA,
  GmudStatus.CANCELADA,
  GmudStatus.AGENDADA,
  GmudStatus.FALHA,
  GmudStatus.EM_REVISAO,
  GmudStatus.PUBLICADA,
];
