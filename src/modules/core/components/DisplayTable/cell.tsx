import { CellType, TCell } from "./CellType";

type IProps = {
  type?: TCell;
  value?: any;
};

const DisplayCell = ({ type, value }: IProps) => {
  if (type === CellType.BADGE)
    return (
      <span className="badge rounded-pill text-bg-secondary">{value}</span>
    );

  if (type === CellType.SEMAPHORE)
    return (
      <span className={`badge rounded-pill text-bg-${value ?? "light"}`}>
        - - -
      </span>
    );

  return <span>{value}</span>;
};

export default DisplayCell;
