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
}: IProps) =>
  (assignees?.length ?? 0) > 0 ? (
    <div
      className="d-inline-flex align-items-center"
      style={{ maxWidth: 1000 }}
    >
      <small className="me-2">Filtrar por:</small>
      <div>
        {assignees?.map((a) => (
          <span
            key={a}
            className={`btn badge opacity me-1 ${
              assigneeSelected === a
                ? "fw-bold text-bg-warning"
                : "text-bg-primary"
            }`}
            onClick={() => onFilterAssigneeClick(a)}
          >
            {a === SEM_ALOCACAO
              ? a
              : `${a.split(" ")[0]} ${a.split(" ")[1][0]}.`}
          </span>
        ))}
      </div>
    </div>
  ) : (
    <></>
  );

export default HeaderFilterBy;
