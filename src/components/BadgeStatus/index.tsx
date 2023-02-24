import BadgeHelper from "../../helpers/badge.helper";
import {
  GmudStatusOrder,
  RepositoryStatusOrder,
  TGmudStatus,
} from "../../types/TGmudStatus";

interface IProps {
  status?: TGmudStatus;
  gmud?: boolean;
  onChange: (status: TGmudStatus) => void;
}

const BadgeStatus = ({ status, gmud, onChange }: IProps) => {
  const statusOrder = gmud ? GmudStatusOrder : RepositoryStatusOrder;

  const toggleStatus = () => {
    if (!status) return;
    let index = statusOrder.indexOf(status);
    index = index + 1 >= statusOrder.length ? 0 : index + 1;
    onChange && onChange(statusOrder[index]);
  };

  return (
    <span
      role="button"
      style={{ minWidth: 85 }}
      className={BadgeHelper.getBadgeClass(status)}
      onClick={toggleStatus}
    >
      {status}
    </span>
  );
};

export default BadgeStatus;
