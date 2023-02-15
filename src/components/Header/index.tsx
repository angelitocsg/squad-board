import HeaderFilterBy from "./containers/FilterBy";
import HeaderGroupBy from "./containers/GroupBy";
import StoryPoint from "./containers/StoryPoint";
import useHeader from "./useHeader";

interface IProps {
  sprintName: string;
  storyPoints: number;
  assignees?: string[];
  onGroupByClick: (opt: number) => void;
  onFilterAssigneeClick: (assignee: string) => void;
}

const Header = ({
  sprintName,
  storyPoints,
  assignees,
  onGroupByClick,
  onFilterAssigneeClick,
}: IProps) => {
  const {
    group_selected,
    assignee_selected,
    handleGroupByClick,
    handleFilterAssigneeClick,
  } = useHeader({ onGroupByClick, onFilterAssigneeClick });

  return (
    <>
      <div className="bg-seconary shadow-sm">
        <nav className="nav p-1 d-flex justify-content-center align-items-center">
          <small className="text-dark">
            <strong>{sprintName}</strong>
          </small>
          <span className="ps-5"></span>
          <StoryPoint storyPoints={storyPoints} />
          <span className="ps-5"></span>
          <HeaderGroupBy
            onGroupByClick={handleGroupByClick}
            groupSelected={group_selected}
          />
        </nav>
      </div>

      <div className="bg-body shadow-sm p-1 ps-0 mb-4">
        <nav className="nav p-1 ps-3 d-flex justify-content-center align-items-center">
          <HeaderFilterBy
            assignees={assignees}
            assigneeSelected={assignee_selected}
            onFilterAssigneeClick={handleFilterAssigneeClick}
          />
        </nav>
      </div>
    </>
  );
};

export default Header;
