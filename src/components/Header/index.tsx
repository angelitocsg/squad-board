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
    <section className="text-center mt-2 mb-4">
      <div>
        <div className="d-inline-flex align-items-center me-5">
          <small>
            <strong>{sprintName}</strong>
          </small>
        </div>

        <StoryPoint storyPoints={storyPoints} />


        <HeaderGroupBy
          onGroupByClick={handleGroupByClick}
          groupSelected={group_selected}
        />
      </div>

      <HeaderFilterBy
        assignees={assignees}
        assigneeSelected={assignee_selected}
        onFilterAssigneeClick={handleFilterAssigneeClick}
      />
    </section>
  );
};

export default Header;
