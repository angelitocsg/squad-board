import { GmudStatus } from "../enums/GmudStatus";
import { TGmudStatus } from "../types/TGmudStatus";
import { PentestStatus, TPentestStatus } from "../types/TPentestStatus";

const getBadgeClass = (status?: TGmudStatus) => {
  const basecss = "badge opacity";
  const statuscss =
    status === GmudStatus.AGENDADA
      ? "text-bg-info"
      : status === GmudStatus.PENDENTE ||
        status === GmudStatus.PREENCHIDA ||
        status === GmudStatus.APROVADA
      ? "text-bg-warning"
      : status === GmudStatus.PUBLICADA
      ? "text-bg-success"
      : status === GmudStatus.FALHA ||
        status === GmudStatus.EM_APROVACAO ||
        status === GmudStatus.BUG ||
        status === GmudStatus.ROLLBACK
      ? "text-bg-danger"
      : status === GmudStatus.EM_REVISAO
      ? "text-bg-info"
      : "text-bg-secondary";
  return `${basecss} ${statuscss}`;
};

const getBadgePentestClass = (status?: TPentestStatus) => {
  const basecss = "badge opacity";
  const statuscss =
    status === PentestStatus.PENDENTE
      ? "text-bg-warning"
      : status === PentestStatus.DESFAVORAVEL
      ? "text-bg-danger"
      : status === PentestStatus.FAVORAVEL
      ? "text-bg-success"
      : status === PentestStatus.RETESTE || status === PentestStatus.TESTE
      ? "text-bg-info"
      : "text-bg-secondary";
  return `${basecss} ${statuscss}`;
};

const BadgeHelper = {
  getBadgeClass,
  getBadgePentestClass,
};

export default BadgeHelper;
