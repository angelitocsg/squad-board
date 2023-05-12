interface IProps {
  onFilterAssigneeClick: (assignee: string) => void;
  onFilterFeatureClick: (feature: string) => void;
  onFilterIssueType: (issueType: string) => void;
}

const useHeader = ({
  onFilterAssigneeClick,
  onFilterFeatureClick,
  onFilterIssueType,
}: IProps) => {
  const handleFilterAssigneeClick = (assignee: string) => {
    if (onFilterAssigneeClick) onFilterAssigneeClick(assignee);
  };

  const handleFilterFeatureClick = (feature: string) => {
    if (onFilterFeatureClick) onFilterFeatureClick(feature);
  };

  const handleFilterIssueType = (feature: string) => {
    if (onFilterIssueType) onFilterIssueType(feature);
  };

  return {
    handleFilterAssigneeClick,
    handleFilterFeatureClick,
    handleFilterIssueType,
  };
};

export default useHeader;
