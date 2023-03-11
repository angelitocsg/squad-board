export enum GmudStatus {
  INDEFINIDA = "-",
  IGNORADA = "IGNORADA",
  CANCELADA = "CANCELADA",
  BUG = "BUG",
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
  | GmudStatus.INDEFINIDA
  | GmudStatus.IGNORADA
  | GmudStatus.CANCELADA
  | GmudStatus.BUG
  | GmudStatus.FALHA
  | GmudStatus.PENDENTE
  | GmudStatus.PREENCHIDA
  | GmudStatus.EM_APROVACAO
  | GmudStatus.APROVADA
  | GmudStatus.AGENDADA
  | GmudStatus.EM_REVISAO
  | GmudStatus.PUBLICADA;

export const GmudStatusOrder = [
  GmudStatus.IGNORADA,
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

export const RepositoryStatusOrder = [
  GmudStatus.INDEFINIDA,
  GmudStatus.BUG,
  GmudStatus.PENDENTE,
  GmudStatus.EM_REVISAO,
  GmudStatus.PUBLICADA,
];
