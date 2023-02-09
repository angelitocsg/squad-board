import BoardCard from "../../../components/BoardCard";
import { IStatus } from "../../../components/BoardColumnStatus";
import { BoardIssues } from "../../../interfaces/BoardIssues";

interface IProps {
  item: BoardIssues;
  status: IStatus;
}

const BoardCards = ({ item, status }: IProps) => (
  <>
    {item.issues
      ?.filter((i) => i.status === status.status)
      .map((subitem) => {
        return (
          <BoardCard
            key={subitem.id}
            description={subitem.description}
            assignee={subitem.assignee}
            id={subitem.id}
            parent_id={subitem.parent_id}
            story_points={subitem.story_points}
            parent_description={subitem.parent_description}
            type={subitem.type}
            priority={subitem.priority ?? "medium"}
          />
        );
      })}
  </>
);

export default BoardCards;
