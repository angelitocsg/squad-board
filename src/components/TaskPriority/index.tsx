interface IProps {
  id?: string;
  priority?: string;
  xclass?: string;
}

const TaskPriority = ({ id, priority, xclass }: IProps) => {
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

  return (
    <span
      className={`d-inline-flex align-items-center ${xclass}`}
      style={{ minWidth: 170 }}
    >
      <i className={`bi ${priorityIcon} ${priorityColor}`}></i>
      <small className="text-muted ps-2">{id}</small>
    </span>
  );
};

export default TaskPriority;
