import { IProjectGmud } from "../../../models/IProjectGmud";

interface IProps {
  gmuds: IProjectGmud[];
}

const PaneGmud = ({ gmuds }: IProps) => {
  return (
    <table className="table table-hover">
      <thead>
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
            <td>{gmud.number}</td>
            <td>{gmud.story}</td>
            <td>{gmud.date}</td>
            <td>{gmud.time}</td>
            <td>{gmud.status}</td>
            <td>{gmud.repositoryId}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PaneGmud;
