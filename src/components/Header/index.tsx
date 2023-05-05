import HeaderFilterBy from "./containers/FilterBy";
import HeaderGroupBy from "./containers/GroupBy";
import StoryPoint from "./containers/StoryPoint";
import useHeader from "./useHeader";

interface IProps {
  sprintName: string;
  storyPoints: { total: number; ended: number };
  totalTasks: { total: number; ended: number };

  assignees?: string[];
  assigneeSelected: string;
  onFilterAssigneeClick: (assignee: string) => void;

  features?: string[];
  featureSelected: string;
  onFilterFeatureClick: (feature: string) => void;

  onGroupByClick: (opt: number) => void;
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
  onGroupByClick,
}: IProps) => {
  const {
    group_selected,
    handleGroupByClick,
    handleFilterAssigneeClick,
    handleFilterFeatureClick,
  } = useHeader({
    onGroupByClick,
    onFilterAssigneeClick,
    onFilterFeatureClick,
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
          <StoryPoint storyPoints={totalTasks} label="Tarefas" />
          <span className="ps-5"></span>
          <HeaderGroupBy
            onGroupByClick={handleGroupByClick}
            groupSelected={group_selected}
          />
        </nav>
      </div>

      <div className="bg-body shadow-sm p-1 ps-0 mb-1">
        <nav className="nav p-1 ps-3 d-flex justify-content-center align-items-center">
          <HeaderFilterBy
            assignees={assignees}
            assigneeSelected={assigneeSelected}
            onFilterAssigneeClick={handleFilterAssigneeClick}
          />
        </nav>
      </div>
      <div className="bg-body shadow-sm ps-0 mb-4">
        <nav className="nav p-1 ps-3 d-flex justify-content-center align-items-center">
          <HeaderFilterBy
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
