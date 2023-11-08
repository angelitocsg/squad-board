import HeaderFilterBy from "./containers/FilterBy";
import StoryPoint from "./containers/StoryPoint";
import useHeader from "./useHeader";

interface IProps {
  sprintName: string;
  storyPoints: { total: number; completed: number };
  totalTasks: { total: number; completed: number };

  assignees?: string[];
  assigneeSelected: string;
  onFilterAssigneeClick: (assignee: string) => void;

  features?: string[];
  featureSelected: string;
  onFilterFeatureClick: (feature: string) => void;

  issueTypes: string[];
  issueTypesSelected: string[];
  onFilterIssueType: (issueTypes: string) => void;
}

const Header = ({
  sprintName,
  storyPoints,
  totalTasks,
  assignees,
  assigneeSelected,
  onFilterAssigneeClick,
  features,
  featureSelected,
  onFilterFeatureClick,
  issueTypes,
  issueTypesSelected,
  onFilterIssueType,
}: IProps) => {
  const {
    handleFilterAssigneeClick,
    handleFilterFeatureClick,
    handleFilterIssueType,
  } = useHeader({
    onFilterAssigneeClick,
    onFilterFeatureClick,
    onFilterIssueType,
  });

  return (
    <>
      <div className="bg-seconary shadow-sm">
        <nav className="nav p-1 d-flex justify-content-center align-items-center">
          <small className="text-dark">
            <strong>{sprintName}</strong>
          </small>
          <span className="ps-5"></span>
          <StoryPoint storyPoints={storyPoints} label="Story Points" />
          <span className="ps-5"></span>
          <StoryPoint storyPoints={totalTasks} label="Tarefas e subs" />
          <span className="ps-5"></span>
          <HeaderFilterBy
            label="Ocultar"
            assignees={issueTypes}
            assigneeSelected=""
            assigneesSelected={issueTypesSelected}
            onFilterAssigneeClick={handleFilterIssueType}
          />
        </nav>
      </div>

      <div className="bg-body shadow-sm p-1 ps-0 mb-1">
        <nav className="nav p-1 ps-3 d-flex justify-content-center align-items-center">
          <HeaderFilterBy
            label="Responsável"
            assignees={assignees}
            assigneeSelected={assigneeSelected}
            onFilterAssigneeClick={handleFilterAssigneeClick}
          />
        </nav>
      </div>
      <div className="bg-body shadow-sm ps-0 mb-4">
        <nav className="nav p-1 ps-3 d-flex justify-content-center align-items-center">
          <HeaderFilterBy
            label="Feature"
            assignees={features}
            assigneeSelected={featureSelected}
            onFilterAssigneeClick={handleFilterFeatureClick}
          />
        </nav>
      </div>
    </>
  );
};

export default Header;
