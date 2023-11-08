import "./style.css";

import { useService } from "../../di/DecouplerContext";
import { SettingsService } from "../../services/SettingsService";

interface IProps {
  id?: string;
  priority?: string;
  xclass?: string;
}

const TaskPriority = ({ id, priority, xclass }: IProps) => {
  const settingsService = useService<SettingsService>("SettingsService");

  if (!id) return <></>;

  const priorityColor =
    priority === "low"
      ? "text-success text-opacity-75"
      : priority === "high"
      ? "text-danger text-opacity-75"
      : priority === "medium"
      ? "text-warning"
      : "text-secondary";

  const priorityIcon =
    priority === "low"
      ? "bi-arrow-down-square-fill"
      : priority === "high"
      ? "bi-arrow-up-square-fill"
      : priority === "medium"
      ? "bi-arrow-right-square-fill"
      : "bi-box-fill";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(id);

    if (!settingsService.board_external_search) return;

    setTimeout(() => {
      window.open(`${settingsService.board_external_search}${id}`, "_blank");
    }, 100);
  };

  return (
    <span
      className={`d-inline-flex align-items-center ${xclass}`}
      style={{ minWidth: 155 }}
    >
      <i className={`bi ${priorityIcon} ${priorityColor}`}></i>
      <span className="link" role="button" onClick={copyToClipboard}>
        <small className="text-muted ps-2">{id}</small>
      </span>
    </span>
  );
};

export default TaskPriority;
