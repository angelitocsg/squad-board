import HeaderFilterBy from "./containers/FilterBy";
import HeaderGroupBy from "./containers/GroupBy";
import StoryPoint from "./containers/StoryPoint";
import useHeader from "./useHeader";

interface IProps {
  assigneeSelected: string;
  sprintName: string;
  storyPoints: { total: number; ended: number };
  totalTasks: number;
  assignees?: string[];
  onGroupByClick: (opt: number) => void;
  onFilterAssigneeClick: (assignee: string) => void;
}

const Header = ({
  assigneeSelected,
  sprintName,
  storyPoints,
  totalTasks,
  assignees,
  onGroupByClick,
  onFilterAssigneeClick,
}: IProps) => {
  const { group_selected, handleGroupByClick, handleFilterAssigneeClick } =
    useHeader({ onGroupByClick, onFilterAssigneeClick });

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
          <StoryPoint storyPoints={{ total: totalTasks }} label="Tarefas" />
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
            assigneeSelected={assigneeSelected}
            onFilterAssigneeClick={handleFilterAssigneeClick}
          />
        </nav>
      </div>
    </>
  );
};

export default Header;
