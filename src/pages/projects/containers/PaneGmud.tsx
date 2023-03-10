import DOMPurify from "dompurify";
import { marked } from "marked";

import BadgeStatus from "../../../components/BadgeStatus";
import { IProjectGmud } from "../../../models/IProjectGmud";
import { TGmudStatus } from "../../../types/TGmudStatus";

interface IProps {
  gmuds: IProjectGmud[];
  onChangeValue: (gmudNumber?: string, name?: string, value?: string) => void;
}

const PaneGmud = ({ gmuds, onChangeValue }: IProps) => {
  const handleStatusChange = (gmud: IProjectGmud, status: TGmudStatus) => {
    onChangeValue && onChangeValue(gmud.number, "status", status);
  };
  return gmuds && gmuds.length > 0 ? (
    <div className="table-responsive">
      <table className="table table-sm table-striped table-hover">
        <thead className="table-secondary">
          <tr>
            <th>Número</th>
            <th>História</th>
            <th>Versão</th>
            <th>Data</th>
            <th>Hora</th>
            <th>Status</th>
            <th>Repositório</th>
            <th>Detalhes</th>
          </tr>
        </thead>
        <tbody>
          {gmuds.map((gmud) => (
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
  ) : (
    <div className="alert alert-danger" role="alert">
      Sem GMUDs registradas
    </div>
  );
};

export default PaneGmud;
