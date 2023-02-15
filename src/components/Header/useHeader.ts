import { useState } from "react";

interface IProps {
  onGroupByClick: (opt: number) => void;
  onFilterAssigneeClick: (assignee: string) => void;
}

const useHeader = ({ onGroupByClick, onFilterAssigneeClick }: IProps) => {
  const [group_selected, set_group_selected] = useState(2);
  const [assignee_selected, set_assignee_selected] = useState("");

  const handleGroupByClick = (group: number) => {
    set_group_selected(group);
    set_assignee_selected("");
    if (onGroupByClick) onGroupByClick(group);
  };

  const handleFilterAssigneeClick = (assignee: string) => {
    set_assignee_selected(assignee);
    if (onFilterAssigneeClick) onFilterAssigneeClick(assignee);
  };

  return {
    group_selected,
    assignee_selected,
    handleGroupByClick,
    handleFilterAssigneeClick,
  };
};

export default useHeader;
