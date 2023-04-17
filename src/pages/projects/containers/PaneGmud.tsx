import DOMPurify from "dompurify";
import { marked } from "marked";

import BadgeStatus from "../../../components/BadgeStatus";
import { IProjectGmud } from "../../../models/IProjectGmud";
import { TGmudStatus } from "../../../types/TGmudStatus";

interface IProps {
  gmuds: IProjectGmud[];
  segmentEnabled?: boolean;
  onChangeValue: (gmudNumber?: string, name?: string, value?: string) => void;
}

interface ISegmented {
  repositoryId?: string;
  gmuds: IProjectGmud[];
  segmentEnabled?: boolean;
}

const PaneGmud = ({ gmuds, segmentEnabled, onChangeValue }: IProps) => {
  const handleStatusChange = (gmud: IProjectGmud, status: TGmudStatus) => {
    onChangeValue && onChangeValue(gmud.number, "status", status);
  };

  const getSegments = () => {
    if (!gmuds) return [];

    let segments: ISegmented[] = [];

    if (!segmentEnabled) {
      return [
        {
          gmuds: gmuds,
          segmentEnabled: false,
        },
      ];
    }

    segments = gmuds.reduce((p, c) => {
      return p.find((f) => f.repositoryId === c.repositoryId)
        ? p
        : [...p, { repositoryId: c.repositoryId, gmuds: [] }];
    }, segments);

    segments = segments.map((x) => {
      x.gmuds = gmuds.filter((f) => f.repositoryId === x.repositoryId);
      return x;
    });

    return segments;
  };

  const getGmudsSegmented = () => {
    const segments: ISegmented[] = getSegments();

    if (!segments.length) return;

    return segments.map((segment) => (
      <div key={segment.repositoryId} className="table-responsive">
        {segmentEnabled ?? (
          <div className="mb-1">
            <span className="h6">Repositório: </span>
            <a
              href={`http://github.com/${segment.repositoryId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {segment.repositoryId?.split("/")[1]}
            </a>
          </div>
        )}
        <table className="table table-sm table-striped table-hover">
          <thead className="table-secondary">
            <tr>
              <th style={{ width: "95px" }}>Número</th>
              <th style={{ width: "150px" }}>História</th>
              <th style={{ width: "70px" }}>Versão</th>
              <th style={{ width: "95px" }}>Data</th>
              <th style={{ width: "55px" }}>Hora</th>
              <th style={{ width: "100px" }}>Status</th>
              <th style={{ minWidth: "150px" }}>Repositório</th>
              <th style={{ width: "150px" }}>Responsável</th>
              <th>Detalhes</th>
            </tr>
          </thead>
          <tbody>
            {segment.gmuds.map((gmud) => (
              <tr key={gmud.number}>
                <td>
                  <a href={gmud.link} target="_blank" rel="noopener noreferrer">
                    {gmud.number}
                  </a>
                </td>
                <td>{gmud.story}</td>
                <td>{gmud.version}</td>
                <td>{gmud.date}</td>
                <td>{gmud.time}</td>
                <td>
                  <BadgeStatus
                    status={gmud.status}
                    gmud
                    onChange={(status) => handleStatusChange(gmud, status)}
                  />
                </td>
                <td>
                  <a
                    href={`http://github.com/${gmud.repositoryId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {gmud.repositoryId?.split("/")[1]}
                  </a>
                </td>
                <td>{gmud.owner}</td>
                <td>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(
                        marked.parse(gmud.description ?? "")
                      ),
                    }}
                    className="small"
                  ></span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ));
  };

  return gmuds && gmuds.length > 0 ? (
    <>{getGmudsSegmented()}</>
  ) : (
    <div className="alert alert-secondary" role="alert">
      Sem GMUDs registradas
    </div>
  );
};

export default PaneGmud;
