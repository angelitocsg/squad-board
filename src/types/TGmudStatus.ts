import { GmudStatus } from "../enums/GmudStatus";

export type TGmudStatus =
  | GmudStatus.INDEFINIDA
  | GmudStatus.IGNORADA
  | GmudStatus.CANCELADA
  | GmudStatus.ROLLBACK
  | GmudStatus.ROLLBACK_FALHA
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
  GmudStatus.ROLLBACK,
  GmudStatus.ROLLBACK_FALHA,
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
