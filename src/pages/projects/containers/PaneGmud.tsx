import DOMPurify from "dompurify";
import { marked } from "marked";

import BadgeStatus from "../../../components/BadgeStatus";
import { IProjectGmud } from "../../../models/IProjectGmud";
import { TGmudStatus } from "../../../types/TGmudStatus";

interface IProps {
  gmuds: IProjectGmud[];
  segmentBy: "repositoryId" | "projectName";
  onChangeValue: (gmudNumber?: string, name?: string, value?: string) => void;
}

interface ISegmented {
  id?: string;
  gmuds: IProjectGmud[];
  segmentBy: "repositoryId" | "projectName";
}

const PaneGmud = ({ gmuds, segmentBy, onChangeValue }: IProps) => {
  const handleStatusChange = (gmud: IProjectGmud, status: TGmudStatus) => {
    onChangeValue && onChangeValue(gmud.number, "status", status);
  };

  const getSegments = () => {
    if (!gmuds) return [];

    switch (segmentBy) {
      case "projectName":
        return segmentByProjectName();
      case "repositoryId":
      default:
        return segmentByRepositoryId();
    }
  };

  const segmentByRepositoryId = (): ISegmented[] => {
    let segments: ISegmented[] = [];

    segments = gmuds.reduce((p, gmud) => {
      return p.find((segment) => segment.id === gmud.repositoryId)
        ? p
        : ([...p, { id: gmud.repositoryId, gmuds: [] }] as ISegmented[]);
    }, segments);

    segments = segments.map((segment) => {
      segment.gmuds = gmuds.filter((gmud) => gmud.repositoryId === segment.id);
      return segment;
    });

    return segments;
  };

  const segmentByProjectName = (): ISegmented[] => {
    let segments: ISegmented[] = [];

    segments = gmuds.reduce((p, gmud) => {
      return p.find((segment) => segment.id === gmud.projectName)
        ? p
        : ([...p, { id: gmud.projectName, gmuds: [] }] as ISegmented[]);
    }, segments);

    segments = segments.map((segment) => {
      segment.gmuds = gmuds.filter((gmud) => gmud.projectName === segment.id);
      return segment;
    });

    return segments;
  };

  const getGmudsSegmented = () => {
    const segments: ISegmented[] = getSegments();

    if (!segments.length) return;

    return segments.map((segment, i) => (
      <div key={i} className="table-responsive">
        {segmentBy === "repositoryId" ? (
          <div className="mb-1">
            <span className="h6">Repositório: </span>
            <a
              href={`http://github.com/${segment.id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {segment.id?.split("/")[1]}
            </a>
          </div>
        ) : (
          <div className="mb-1">
            <span className="h6">{segment.id}</span>
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
              <th style={{ width: "380px" }}>Repositório</th>
              <th style={{ width: "150px" }}>Responsável</th>
              <th>Detalhes</th>
            </tr>
          </thead>
          <tbody>
            {segment.gmuds.map((gmud, i) => (
              <tr key={i}>
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
          {segmentBy === "projectName" ? undefined : (
            <tfoot>
              <tr>
                <td colSpan={9}>
                  <span
                    className="badge p-2 bg-primary nav-link"
                    role="button"
                    onClick={() => alert("função indisponível")}
                  >
                    + gmud
                  </span>
                </td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    ));
  };

  return gmuds && gmuds.length > 0 ? (
    <>{getGmudsSegmented()}</>
  ) : (
    <>
      <div className="alert alert-secondary" role="alert">
        Sem GMUDs registradas
      </div>
      <span
        className="badge p-2 bg-primary nav-link"
        role="button"
        onClick={() => alert("função indisponível")}
      >
        + gmud
      </span>
    </>
  );
};

export default PaneGmud;
