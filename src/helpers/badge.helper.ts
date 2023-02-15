import { TGmudStatus } from "../types/TGmudStatus";

const getBadgeClass = (status?: TGmudStatus) => {
  const basecss = "badge opacity";
  const statuscss =
    status === "AGENDADA" || status === "PENDENTE" || status === "PREENCHIDA"
      ? "text-bg-warning"
      : status === "PUBLICADA"
      ? "text-bg-success"
      : status === "FALHA" || status === "EM APROVAÇÃO"
      ? "text-bg-danger"
      : status === "EM REVISÃO"
      ? "text-bg-info"
      : "text-bg-secondary";
  return `${basecss} ${statuscss}`;
};

const BadgeHelper = {
  getBadgeClass,
};

export default BadgeHelper;
