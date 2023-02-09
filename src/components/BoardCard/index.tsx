import { TFeatureType, TPriority } from "../../interfaces/BoardIssues";
import BoardCardBody from "./containers/Body";
import BoardCardDetails from "./containers/Details";
import BoardCardGroupExpander from "./containers/GroupExpander";
import BoardCardTitle from "./containers/Title";
import useBoardCard from "./useBoardCard";

interface IProps {
  description?: string;
  assignee?: string;
  id?: string;
  parent_id?: string;
  parent_description?: string;
  type?: TFeatureType;
  priority?: TPriority;
  story_points?: number;
  status?: string;
  group?: boolean;
  hidden?: boolean;
  onClick?: (expanded: boolean) => void;
}

const BoardCard = ({
  description,
  assignee,
  id,
  parent_id,
  parent_description,
  type,
  priority,
  story_points,
  status,
  group,
  hidden,
  onClick,
  ...props
}: IProps) => {
  const { expanded, featureColor, parentDescription, handleClick } =
    useBoardCard({ status, story_points, type, parent_description, onClick });

  if (hidden) return <></>;

  return (
    <div
      className={`card rounded shadow-sm ${group ? "mb-2" : "mb-3"}`}
      role={group ? "button" : "cell"}
      onClick={handleClick}
      {...props}
    >
      <BoardCardTitle
        featureColor={featureColor}
        parentDescription={parentDescription}
      />
      <BoardCardBody group={group}>
        <BoardCardDetails
          id={id}
          group={group}
          description={description}
          expanded={expanded}
          assignee={assignee}
          priority={priority}
          parent_id={parent_id}
        />
        <BoardCardGroupExpander
          id={id}
          group={group}
          expanded={expanded}
          priority={priority}
        />
      </BoardCardBody>
    </div>
  );
};

export default BoardCard;
