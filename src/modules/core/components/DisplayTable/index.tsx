import HeaderActions, { IHeaderActions } from "./headerActions";
import DisplayTableLine from "./line";

export type IColumns = {
  field: string;
  title: string;
  width?: number;
};

export type IActions = {
  label: string;
  onClick?: (data: any) => void;
};

type IProps = {
  columns: IColumns[];
  lines: any[];
  actions?: IActions[];
  headerButtons?: IHeaderActions;
  onLineClick?: (data: any) => void;
};

const DisplayTable = ({ actions, columns, lines, headerButtons, onLineClick }: IProps) => {
  return (
    <div className="card">
      <div className="card-body">
        {headerButtons && <HeaderActions {...headerButtons} />}
        <table className="table table-hover">
          <thead className="table-light">
            <tr>
              {columns.map((c, i) => (
                <th key={i}>{c.title}</th>
              ))}
              {actions ? <th>Ações</th> : undefined}
            </tr>
          </thead>
          <tbody>
            {lines.map((ln, li) => (
              <DisplayTableLine
                actions={actions}
                key={li}
                lineKey={li}
                columns={columns}
                line={ln}
                onLineClick={onLineClick}
              />
            ))}
          </tbody>
        </table>
        <span className="small">
          Exibindo <strong>{lines.length}</strong> registros
        </span>
      </div>
    </div>
  );
};

export default DisplayTable;
