import { useState } from "react";

interface IProps {
  onGroupByClick: (opt: number) => void;
  onFilterAssigneeClick: (assignee: string) => void;
  onFilterFeatureClick: (feature: string) => void;
}

const useHeader = ({
  onGroupByClick,
  onFilterAssigneeClick,
  onFilterFeatureClick,
}: IProps) => {
  const [group_selected, set_group_selected] = useState(2);

  const handleGroupByClick = (group: number) => {
    set_group_selected(group);
    if (onGroupByClick) onGroupByClick(group);
  };

  const handleFilterAssigneeClick = (assignee: string) => {
    if (onFilterAssigneeClick) onFilterAssigneeClick(assignee);
  };

  const handleFilterFeatureClick = (feature: string) => {
    if (onFilterFeatureClick) onFilterFeatureClick(feature);
  };

  return {
    group_selected,
    handleGroupByClick,
    handleFilterAssigneeClick,
    handleFilterFeatureClick,
  };
};

export default useHeader;
