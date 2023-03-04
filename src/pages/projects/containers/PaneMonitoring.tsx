import { IProjectMonitoring } from "../../../models/IProjectMonitoring";

interface IProps {
  monitoring?: IProjectMonitoring[];
}

const PaneMonitoring = ({ monitoring }: IProps) => {
  return monitoring && monitoring.length > 0 ? (
    <table className="table table-sm table-striped table-hover">
      <thead className="table-secondary">
        <tr>
          <th>Serviço</th>
          <th>Ambiente</th>
          <th>Link</th>
          <th>Observações</th>
        </tr>
      </thead>
      <tbody>
        {monitoring &&
          monitoring.map((m) =>
            m.links?.map((l) => (
              <tr key={l.label}>
                <td>{m.service}</td>
                <td>{l.environment}</td>
                <td>
                  <a href={l.link} target="_blank" rel="noopener noreferrer">
                    {l.label}
                  </a>
                </td>
                <td>{l.remarks}</td>
              </tr>
            ))
          )}
      </tbody>
    </table>
  ) : (
    <div className="alert alert-danger" role="alert">
      Sem itens de monitoramento registrados
    </div>
  );
};

export default PaneMonitoring;
