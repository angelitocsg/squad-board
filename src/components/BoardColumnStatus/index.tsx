import { COLUMN_WIDTH } from "../BoardColumn";

export interface IStatus {
  id: string;
  status: string;
  count: number;
}

interface IProps {
  statusList: IStatus[];
}

const BoardColumnStatus = ({ statusList }: IProps) => {
  return (
    <div className="col-status d-flex text-center">
      {statusList.map((status) => (
        <div
          key={status.status}
          className="col"
          style={{ minWidth: COLUMN_WIDTH, width: "100%" }}
        >
          <div className="px-2">
            <div className="border rounded text-bg-dark opacity h6 py-2 shadow-sm d-flex justify-content-center">
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
