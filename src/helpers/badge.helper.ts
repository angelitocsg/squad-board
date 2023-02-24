import { GmudStatus, TGmudStatus } from "../types/TGmudStatus";

const getBadgeClass = (status?: TGmudStatus) => {
  const basecss = "badge opacity";
  const statuscss =
    status === GmudStatus.AGENDADA ||
    status === GmudStatus.PENDENTE ||
    status === GmudStatus.PREENCHIDA ||
    status === GmudStatus.APROVADA
      ? "text-bg-warning"
      : status === GmudStatus.PUBLICADA
      ? "text-bg-success"
      : status === GmudStatus.FALHA ||
        status === GmudStatus.EM_APROVACAO ||
        status === GmudStatus.BUG
      ? "text-bg-danger"
      : status === GmudStatus.EM_REVISAO
      ? "text-bg-info"
      : "text-bg-secondary";
  return `${basecss} ${statuscss}`;
};

const BadgeHelper = {
  getBadgeClass,
};

export default BadgeHelper;
