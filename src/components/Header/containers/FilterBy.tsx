import { SEM_ALOCACAO } from "../../../services/ImportService";

interface IProps {
  assignees?: string[];
  assigneeSelected: string;
  onFilterAssigneeClick: (assignee: string) => void;
}

const HeaderFilterBy = ({
  assignees,
  assigneeSelected,
  onFilterAssigneeClick,
}: IProps) => {
  const getFormatedName = (assignee: string) => {
    const parts = assignee.split(" ");
    return parts.length > 1 ? `${parts[0]} ${parts[1][0]}.` : assignee;
  };

  return (assignees?.length ?? 0) > 0 ? (
    <div
      className="d-inline-flex align-items-center"
      style={{ maxWidth: 1200 }}
    >
      <small className="me-2">Filtrar por:</small>
      <div>
        {assignees?.map((assignee) => (
          <span
            key={assignee}
            className={`btn badge opacity me-1 ${
              assigneeSelected === assignee
                ? "fw-bold text-bg-warning"
                : "text-bg-primary"
            }`}
            onClick={() => onFilterAssigneeClick(assignee)}
          >
            {assignee === SEM_ALOCACAO ? assignee : getFormatedName(assignee)}
          </span>
        ))}
      </div>
    </div>
  ) : (
    <></>
  );
};

export default HeaderFilterBy;
