export enum GmudStatus {
  CANCELADA = "CANCELADA",
  FALHA = "FALHA",
  PENDENTE = "PENDENTE",
  PREENCHIDA = "PREENCHIDA",
  EM_APROVACAO = "EM APROVAÇÃO",
  APROVADA = "APROVADA",
  AGENDADA = "AGENDADA",
  EM_REVISAO = "EM REVISÃO",
  PUBLICADA = "PUBLICADA",
}

export type TGmudStatus =
  | GmudStatus.CANCELADA
  | GmudStatus.FALHA
  | GmudStatus.PENDENTE
  | GmudStatus.PREENCHIDA
  | GmudStatus.EM_APROVACAO
  | GmudStatus.APROVADA
  | GmudStatus.AGENDADA
  | GmudStatus.EM_REVISAO
  | GmudStatus.PUBLICADA;

export const GmudStatusOrder = [
  GmudStatus.CANCELADA,
  GmudStatus.FALHA,
  GmudStatus.PENDENTE,
  GmudStatus.PREENCHIDA,
  GmudStatus.EM_APROVACAO,
  GmudStatus.APROVADA,
  GmudStatus.AGENDADA,
  GmudStatus.EM_REVISAO,
  GmudStatus.PUBLICADA,
];
