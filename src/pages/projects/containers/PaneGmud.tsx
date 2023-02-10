import BadgeHelper from "../../../helpers/badge.helper";
import { IProjectGmud } from "../../../models/IProjectGmud";

interface IProps {
  gmuds: IProjectGmud[];
}

const PaneGmud = ({ gmuds }: IProps) => {
  return (
    <table className="table table=striped table-hover">
      <thead className="table-secondary">
        <tr>
          <th>Número</th>
          <th>História</th>
          <th>Data</th>
          <th>Hora</th>
          <th>Status</th>
          <th>Repositório</th>
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
            <td>{gmud.date}</td>
            <td>{gmud.time}</td>
            <td>
              <span className={BadgeHelper.getBadgeClass(gmud.status)}>
                {gmud.status}
              </span>
            </td>
            <td>{gmud.repositoryId}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PaneGmud;
