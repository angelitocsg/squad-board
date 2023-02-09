import { COLUMN_WIDTH } from "../BoardColumn";

export interface IStatus {
  id: string;
  status: string;
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
            <div className="border rounded bg-dark opacity text-light h6 py-2 shadow-sm">
              {status.status}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BoardColumnStatus;
