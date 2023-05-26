import { useState } from "react";

import { TIssueType } from "../../types/TIssueType";
import { IssueStatus } from "../../enums/IssueStatus";

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

  type = type?.toLocaleLowerCase() as TIssueType;
  type = parent_id?.startsWith("BUG") ? "sub-bug" : type;

  const featureColorByType =
    type === "task" || type === "sub-task"
      ? "bg-primary text-white"
      : type === "feature"
      ? "bg-info text-white"
      : type === "story"
      ? "bg-success text-white"
      : type === "bug" || type === "sub-bug"
      ? "bg-danger text-white"
      : type === "opportunity"
      ? "bg-warning text-black"
      : "bg-secondary text-white";

  const featureColorByStatus =
    status === IssueStatus.ENCERRADO_ATIVADO
      ? "bg-secondary text-white opacity-disabled"
      : status === IssueStatus.EM_TESTES
      ? "opacity-70"
      : status === IssueStatus.EM_VALIDACAO ||
        status === IssueStatus.EM_IMPLANTACAO ||
        status === IssueStatus.IMPLANTADO
      ? "opacity-disabled"
      : "";

  const featureColor = `${featureColorByType} ${featureColorByStatus}`;

  const parentDescriptionAlternative =
    type === "story"
      ? "HISTÓRIA"
      : type === "task"
      ? "TAREFA"
      : type === "bug"
      ? "BUG"
      : type === "opportunity"
      ? "OPORTUNIDADE"
      : "";

  const parentDescription = parent_description
    ? parent_description?.substring(0, 43) +
      ((parent_description?.length ?? 0) > 43 ? "..." : "")
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
