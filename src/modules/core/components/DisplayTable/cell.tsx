import { CellType, TCell } from "./CellType";

type IProps = {
  type?: TCell;
  value?: any;
};

const DisplayCell = ({ type, value }: IProps) => {
  const value2 = value?.type ? value.value : value;
  const type2 = value?.type ?? "secondary";

  if (type === CellType.BADGE)
    return (
      <span className={`badge rounded-pill text-bg-${type2}`}>
        {value2}
      </span>
    );

  if (type === CellType.SEMAPHORE)
    return (
      <span className={`badge rounded-pill text-bg-${value2 ?? "light"}`}>
        - - -
      </span>
    );

  return <span>{value2}</span>;
};

export default DisplayCell;
