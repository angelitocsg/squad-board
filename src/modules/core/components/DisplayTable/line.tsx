import { IActions, IColumns } from ".";

type IProps = {
  lineKey: any;
  columns: IColumns[];
  line: any;
  actions?: IActions[];
  onLineClick?: (data: any) => void;
};

const DisplayTableLine = ({
  lineKey,
  columns,
  line,
  actions,
  onLineClick,
}: IProps) => {
  const handleOnClick = () => {
    onLineClick && onLineClick(line);
  };
  const handleActionClick = (event: any) => {
    event && event(line);
  };
  return (
    <tr key={lineKey} role={onLineClick ? "button" : undefined}>
      {columns.map((cl, ci) => (
        <td key={`${lineKey}_${ci}`} onClick={handleOnClick}>
          {line[cl.field]}
        </td>
      ))}
      <td>
        {actions?.map((a, i) => (
          <div
            key={`act_${i}`}
            onClick={() => handleActionClick(a.onClick)}
            className="small btn-link d-inline-flex px-1 text-primary"
          >
            {a.label}
          </div>
        ))}
      </td>
    </tr>
  );
};

export default DisplayTableLine;
