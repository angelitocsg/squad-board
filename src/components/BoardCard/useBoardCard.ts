import { useState } from "react";
import { TFeatureType } from "../../interfaces/BoardIssues";

interface IProps {
  status?: string;
  story_points?: number;
  type?: string;
  parent_id?: string;
  parent_description?: string;
  onClick?: (expanded: boolean) => void;
}

const useBoardCard = ({
  status,
  story_points,
  type,
  parent_id,
  parent_description,
  onClick,
}: IProps) => {
  const [expanded, setExpanded] = useState(false);

  const handleClick = () => {
    const expand = !expanded;
    setExpanded(expand);
    if (onClick) onClick(expand);
  };

  type = type?.toLocaleLowerCase() as TFeatureType;
  type = parent_id?.startsWith("BUG") ? "sub-bug" : type;

  const featureColor =
    type === "task" || type === "sub-task"
      ? "bg-primary"
      : type === "feature"
      ? "bg-info"
      : type === "story"
      ? "bg-success"
      : type === "bug" || type === "sub-bug"
      ? "bg-danger"
      : "bg-secondary";

  const parentDescriptionAlternative =
    type === "story"
      ? "HISTÓRIA"
      : type === "task"
      ? "TAREFA"
      : type === "bug"
      ? "BUG"
      : "";

  const parentDescription = parent_description
    ? parent_description?.substring(0, 45) +
      ((parent_description?.length ?? 0) > 45 ? "..." : "")
    : `${parentDescriptionAlternative} ${
        story_points ? `(${story_points})` : ""
      } ${status ? `[${status}]` : ""}`;

  return {
    expanded,
    featureColor,
    parentDescription,
    handleClick,
  };
};

export default useBoardCard;
