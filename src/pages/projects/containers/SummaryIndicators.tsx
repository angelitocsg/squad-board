import { ISummaryIndicators } from "../../../models/ISummaryIndicators";

interface IProps {
  indicators?: ISummaryIndicators;
}

const SummaryIndicators = ({ indicators }: IProps) => {
  return (
    <div>
      <h1 className="h4">GMUDs</h1>
      <div className="row mb-3 text-center">
        {indicators?.gmuds?.map((g) => (
          <div key={g.status} className="col">
            <div className="card mb-4 shadow-sm">
              <div className="card-header text-bg-dark">{g.status}&nbsp;</div>
              <div className="card-body text-bg-secondary">
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
