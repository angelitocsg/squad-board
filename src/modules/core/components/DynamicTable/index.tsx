import HeaderActions, { IHeaderActions } from "./headerActions";
import DynamicTableLine from "./line";

export type IColumns = {
  field: string;
  title: string;
  width?: number;
  visible?: boolean;
  datalist?: string[];
  required?: boolean;
  indent?: boolean;
};

export type IActions = {
  label: string;
  onClick?: (data: any) => void;
};

type IProps = {
  groupFirst?: string;
  groupSecond?: string;
  columns: IColumns[];
  lines: any[];
  actions?: IActions[];
  headerButtons?: IHeaderActions;
  onFieldChange?: (line: any, field: any, value: any) => void;
};

const DynamicTable = ({
  groupFirst,
  actions,
  columns,
  lines,
  headerButtons,
  onFieldChange,
}: IProps) => {
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
              <DynamicTableLine
                actions={actions}
                key={li}
                lineKey={li}
                columns={columns}
                line={ln}
                onFieldChange={onFieldChange}
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

export default DynamicTable;
