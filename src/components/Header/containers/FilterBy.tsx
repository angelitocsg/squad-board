import { SEM_ALOCACAO, SEM_FEATURE } from "../../../constants/board.constants";
import { useService } from "../../../di/DecouplerContext";
import { SettingsService } from "../../../services/SettingsService";

interface IProps {
  label: string;
  assignees?: string[];
  assigneeSelected: string;
  assigneesSelected?: string[];
  onFilterAssigneeClick: (assignee: string) => void;
}

const HeaderFilterBy = ({
  label,
  assignees,
  assigneeSelected,
  assigneesSelected,
  onFilterAssigneeClick,
}: IProps) => {
  const settingsService = useService<SettingsService>("SettingsService");

  const getFormatedName = (assignee: string) => {
    const parts = assignee.split(" ");
    return parts.length > 1 ? `${parts[0]} ${parts[1][0]}.` : assignee;
  };

  const getLabel = (assignee: string) => {
    return settingsService.getFeatureLabel(assignee);
  };

  return (assignees?.length ?? 0) > 0 ? (
    <div className="d-inline-flex align-items-center">
      <small className="me-2">{label}:</small>
      <div>
        {assignees?.map((assignee) => (
          <span
            key={assignee}
            className={`btn badge opacity me-1 ${
              assigneeSelected === assignee || assigneesSelected?.find((f) => f === assignee)
                ? "fw-bold text-bg-warning"
                : "text-bg-primary"
            }`}
            onClick={() => onFilterAssigneeClick(assignee)}>
            {assignee === SEM_ALOCACAO || assignee === SEM_FEATURE
              ? assignee
              : getLabel(getFormatedName(assignee))}
          </span>
        ))}
      </div>
    </div>
  ) : (
    <></>
  );
};

export default HeaderFilterBy;
