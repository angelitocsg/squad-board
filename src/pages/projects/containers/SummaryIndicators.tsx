import { ISummaryIndicators } from "../../../models/ISummaryIndicators";
import { GmudStatus } from "../../../types/TGmudStatus";

interface IProps {
  indicators?: ISummaryIndicators;
}

const SummaryIndicators = ({ indicators }: IProps) => {
  const resolveStatusBg = (status?: GmudStatus) => {
    const defClass = "card-body bg-opacity-75";
    return status === GmudStatus.PENDENTE ||
      status === GmudStatus.APROVADA ||
      status === GmudStatus.AGENDADA
      ? `${defClass} bg-warning`
      : status === GmudStatus.EM_APROVACAO || status === GmudStatus.FALHA
      ? `${defClass} bg-danger`
      : status === GmudStatus.EM_REVISAO
      ? `${defClass} bg-info`
      : status === GmudStatus.PUBLICADA
      ? `${defClass} bg-success`
      : `${defClass} bg-secondary`;
  };

  return (
    <div>
      <h1 className="h4">GMUDs</h1>
      <div className="row mb-3 text-center">
        {indicators?.gmuds
          ?.filter((f) => f.status !== GmudStatus.IGNORADA)
          ?.map((g) => (
            <div key={g.status} className="col">
              <div className="card mb-4 shadow-sm">
                <div className="card-header text-bg-dark">{g.status}&nbsp;</div>
                <div className={resolveStatusBg(g.status)}>
                  <span className="h1">{g.count}</span>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SummaryIndicators;
