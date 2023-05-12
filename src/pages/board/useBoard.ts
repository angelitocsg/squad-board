import { useEffect, useState } from "react";

import { IStatus } from "../../components/BoardColumnStatus";
import { useService } from "../../di/DecouplerContext";
import { IssueType } from "../../enums/IssueType";
import { IBoardAssignee } from "../../models/IBoardAssignee";
import { IBoardIssue } from "../../models/IBoardIssue";
import { BoardRepository } from "../../repository/BoardRepository";
import { BoardService } from "../../services/BoardService";

const useBoard = () => {
  const service = useService<BoardService>("BoardService");
  const repository = useService<BoardRepository>("BoardRepository");

  const [sprint_name, set_sprint_name] = useState("Sprint");

  const [assignees, set_assignees] = useState<IBoardAssignee[]>([]);
  const [assignee_selected, set_assignee_selected] = useState("");

  const features = repository.getFeatures();
  const [feature_selected, set_feature_selected] = useState("");

  const [status, set_status] = useState<IStatus[]>([]);
  const [status_selected, set_status_selected] = useState("");

  const issue_types = [
    IssueType.story,
    IssueType.bug,
    IssueType.task,
    IssueType.subs,
    IssueType.opportunity,
  ];
  const [issues_hidden, set_issues_hidden] = useState<string[]>([]);

  const story_points = {
    total: repository.countStoryPoints(),
    completed: repository.countCompletedStoryPoints(),
  };

  const total_tasks = {
    total: repository.countTasks(),
    completed: 0,
  };

  const [issues, set_issues] = useState<IBoardIssue[]>([]);

  const loadData = () => {
    set_issues(repository.getAllIssues());
    set_sprint_name(repository.getSprintName());
    set_assignees(repository.getAssignees());
    set_status(repository.getStatusAndItemsCount());
  };

  const handleFilterAssignee = (assignee: string) => {
    if (assignee === assignee_selected) assignee = "";
    set_assignee_selected(assignee);
    set_issues(repository.filterByAssignee(assignee));
  };

  const handleFilterFeature = (feature: string) => {
    if (feature === feature_selected) feature = "";
    set_feature_selected(feature);
    set_issues(repository.filterByFeature(feature));
  };

  const handleFilterIssueType = (issueType: string) => {
    let issuesToHidden: string[] = [...issues_hidden, issueType];

    if (issues_hidden.find((f) => f === issueType)) {
      issuesToHidden = issues_hidden.filter((f) => f !== issueType);
    }
    set_issues_hidden(issuesToHidden);
    set_issues(repository.hiddenByIssueType(issuesToHidden));
  };

  const handleFilterByStatus = (status: string) => {
    if (status === status_selected) status = "";
    set_status_selected(status);
    set_issues(repository.filterByStatus(status));
  };

  const handleFileUpload = (data: string) => {
    service.import(data);
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  useEffect(() => {
    document.title = "Tarefas | Squad";
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    assignees,
    assignee_selected,
    features,
    feature_selected,
    status_selected,
    sprint_name,
    status,
    story_points,
    total_tasks,
    issues,
    issue_types,
    issues_hidden,
    loadData,
    handleFilterAssignee,
    handleFilterByStatus,
    handleFilterIssueType,
    handleFileUpload,
    handleFilterFeature,
  };
};

export default useBoard;
