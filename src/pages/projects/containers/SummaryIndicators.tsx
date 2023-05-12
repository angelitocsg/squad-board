import { GmudStatus } from "../../../enums/GmudStatus";
import { ISummaryIndicators } from "../../../models/ISummaryIndicators";

interface IProps {
  indicators?: ISummaryIndicators;
  titleHidden?: boolean;
}

const SummaryIndicators = ({ indicators, titleHidden }: IProps) => {
  const resolveStatusBg = (status?: GmudStatus) => {
    const defClass = "card-body bg-opacity-75";
    return status === GmudStatus.PENDENTE || status === GmudStatus.APROVADA
      ? `${defClass} bg-warning`
      : status === GmudStatus.EM_APROVACAO || status === GmudStatus.FALHA
      ? `${defClass} bg-danger`
      : status === GmudStatus.EM_REVISAO
      ? `${defClass} bg-info`
      : status === GmudStatus.PUBLICADA
      ? `${defClass} bg-success`
      : status === GmudStatus.AGENDADA
      ? `${defClass} bg-primary`
      : `${defClass} bg-secondary`;
  };

  return (
    <div>
      {titleHidden ? "" : <h1 className="h4">GMUDs</h1>}
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
        <div className="col">
          <div className="card mb-4 shadow-sm">
            <div className="card-header text-bg-dark">TOTAL</div>
            <div className="card-body bg-opacity-75 bg-secondary">
              <span className="h1">
                {indicators?.gmuds?.reduce((p, c) => p + c.count, 0)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryIndicators;
