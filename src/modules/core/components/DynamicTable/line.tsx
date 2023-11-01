import { IActions, IColumns } from ".";

type IProps = {
  lineKey: any;
  columns: IColumns[];
  line: any;
  actions?: IActions[];
  onFieldChange?: (line: any, field: any, value: any) => void;
};

const DynamicTableLine = ({ lineKey, columns, line, actions, onFieldChange }: IProps) => {
  const handleFieldChange = (line: any, field: any, value: any) => {
    onFieldChange && onFieldChange(line, field, value);
  };
  const handleActionClick = (event: any) => {
    event && event(line);
  };
  return (
    <tr key={lineKey}>
      {columns.map((cl, ci) => {
        const indentTabs = (line[cl.field]?.match(/\t/g) || []).length;
        const value = line[cl.field].replace(/\t/g, "");

        return (
          <td key={`${lineKey}_${ci}`} style={{ width: cl.width }}>
            <input
              className={`form-control form-control-sm border-0 ${
                cl.required && !value ? "is-invalid" : ""
              }${cl.indent && indentTabs ? "text-secondary" : ""}`}
              type="text"
              name={cl.field}
              value={value}
              autoComplete="off"
              style={{
                width: cl.width,
                paddingLeft: cl.indent && indentTabs ? indentTabs * 16 : 8,
              }}
              onChange={e => handleFieldChange(line, e.target.name, e.target.value)}
              list={`${cl.field}_datalist`}
              required={cl.required}
            />
            <datalist id={`${cl.field}_datalist`}>
              {cl.datalist?.map(i => (
                <option key={i} value={i} />
              ))}
            </datalist>
          </td>
        );
      })}
      <td>
        {actions?.map((a, i) => (
          <div
            key={`act_${i}`}
            onClick={() => handleActionClick(a.onClick)}
            className="small btn-link d-inline-flex px-1 text-primary">
            {a.label}
          </div>
        ))}
      </td>
    </tr>
  );
};

export default DynamicTableLine;
