import { COLUMN_WIDTH } from "../BoardColumn";

export interface IStatus {
  id: string;
  status: string;
  count: number;
}

interface IProps {
  statusSelected: string;
  statusList: IStatus[];
  onStatusClick: (status: string) => void;
}

const BoardColumnStatus = ({
  statusSelected,
  statusList,
  onStatusClick,
}: IProps) => {
  const handleStatusClick = (status: string) => {
    onStatusClick && onStatusClick(status);
  };

  const getClassName = (status: string) => {
    const cssDefault =
      "border rounded opacity h6 py-2 shadow-sm d-flex justify-content-center";
    return statusSelected === status
      ? `${cssDefault} text-bg-warning`
      : `${cssDefault} text-bg-dark`;
  };

  return (
    <div className="col-status d-flex text-center">
      {statusList.map((status) => (
        <div
          key={status.status}
          className="col"
          style={{ minWidth: COLUMN_WIDTH, width: "100%" }}
        >
          <div className="px-2">
            <div
              role="button"
              className={getClassName(status.status)}
              onClick={() => handleStatusClick(status.status)}
            >
              <span>{status.status}</span>
              <span className="ms-2 badge rounded-pill text-bg-light">
                {status.count}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BoardColumnStatus;
