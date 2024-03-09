import BoardCard from "../../../components/BoardCard";
import { IStatus } from "../../../components/BoardColumnStatus";
import { PriorityEnum } from "../../../enums/PriorityEnum";
import { IBoardIssue } from "../../../models/IBoardIssue";

interface IProps {
  item: IBoardIssue;
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
            status={subitem.status}
            parent_id={subitem.parent_id}
            story_points={subitem.story_points}
            parent_description={subitem.parent_description}
            type={subitem.type}
            priority={subitem.priority ?? PriorityEnum.MEDIUM}
            impediment={subitem.impediment ?? false}
            impediment_description={subitem.impediment_description}
          />
        );
      })}
  </>
);

export default BoardCards;
