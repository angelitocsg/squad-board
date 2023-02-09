import { useState } from "react";
import { ImportService } from "../../services/ImportService";

interface IProps {
  onGroupByClick: (opt: number) => void;
  onFilterAssigneeClick: (assignee: string) => void;
}

const useHeader = ({ onGroupByClick, onFilterAssigneeClick }: IProps) => {
  const [group_selected, set_group_selected] = useState(2);
  const [assignee_selected, set_assignee_selected] = useState("");

  const handleGroupByClick = (group: number) => {
    set_group_selected(group);
    if (onGroupByClick) onGroupByClick(group);
  };

  const handleFilterAssigneeClick = (assignee: string) => {
    set_assignee_selected(assignee);
    if (onFilterAssigneeClick) onFilterAssigneeClick(assignee);
  };

  const limparDados = () => {
    localStorage.clear();
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  const handleFileUpload = (data: string)=>{
    ImportService.ImportCSV(data);
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }

  return {
    group_selected,
    assignee_selected,
    handleGroupByClick,
    handleFilterAssigneeClick,
    handleFileUpload,
    limparDados,
  };
};

export default useHeader;
