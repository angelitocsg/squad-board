import { useEffect, useState } from "react";

import { IStatus } from "../../components/BoardColumnStatus";
import { BoardIssues } from "../../interfaces/BoardIssues";
import { ImportService } from "../../services/ImportService";

const useBoard = () => {
  const [assignee_selected, set_assignee_selected] = useState("");
  const [story_points, set_story_points] = useState(0);
  const [bd_status, set_bd_status] = useState<IStatus[]>([]);
  const [bd_sprint_name, set_bd_sprint_name] = useState("Sprint");
  const [bd_squad_name, set_bd_squad_name] = useState("squad");
  const [bd_story_task_bug, set_bd_story_task_bug] = useState<BoardIssues[]>(
    []
  );
  const [bd_assignees, set_bd_assignees] = useState<BoardIssues[]>([]);
  const [show_by, set_show_by] = useState<BoardIssues[]>([]);
  const [last_show_by, set_last_show_by] = useState<BoardIssues[]>([]);

  const loadData = () => {
    let ls = localStorage.getItem("board_data_status");
    if (ls) set_bd_status(JSON.parse(ls));
    ls = localStorage.getItem("board_data_sprint_name");
    if (ls) set_bd_sprint_name(ls);
    ls = localStorage.getItem("board_data_squad_name");
    if (ls) set_bd_squad_name(ls);

    ls = localStorage.getItem("board_data_story_task_bug");
    if (ls) set_bd_story_task_bug(JSON.parse(ls));
    ls = localStorage.getItem("board_data_assignees");
    if (ls) set_bd_assignees(JSON.parse(ls));
  };

  const handleGroupBy = (opt: number) => {
    set_assignee_selected("");
    switch (opt) {
      case 2:
        set_show_by(bd_story_task_bug);
        set_last_show_by(bd_story_task_bug);
        break;
      case 3:
        set_show_by(bd_assignees);
        set_last_show_by(bd_assignees);
        break;
    }
  };

  const handleFilterAssignee = (assignee: string) => {
    if (assignee_selected === assignee) {
      set_assignee_selected("");
      set_show_by(JSON.parse(JSON.stringify(last_show_by)));
      return;
    }
    
    set_assignee_selected(assignee);

    const last_show_by_copy: BoardIssues[] = JSON.parse(
      JSON.stringify(last_show_by)
    );
    set_show_by(
      last_show_by_copy.filter((f) => {
        const filtered = f.issues?.filter((s) => s.assignee === assignee);

        if (f.assignee === assignee || (filtered?.length ?? 0) > 0) {
          f.issues = filtered;
          return true;
        }
        return false;
      })
    );
  };

  const handleFileUpload = (data: string) => {
    ImportService.ImportCSV(data);
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  const countStatus = (status: string) => {
    return show_by.reduce((p, c) => {
      const count1: number = c.status === status ? 1 : 0;
      const count2 =
        c.issues?.reduce(
          (pp, cc) => (cc.status === status ? (pp = pp + 1) : pp),
          0
        ) ?? 0;
      return p + count1 + count2;
    }, 0);
  };

  const getStatus = (): IStatus[] => {
    return bd_status.map((st) => ({
      id: st.id,
      status: st.status,
      count: countStatus(st.status), // show_by?.filter((f) => f.status === st.status)?.length ?? 0,
    }));
  };

  const getTotalTasks = () => getStatus().reduce((p, c) => p + c.count, 0);

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Default data
  useEffect(() => {
    set_show_by(bd_story_task_bug);
    set_last_show_by(bd_story_task_bug);

    const points = bd_story_task_bug
      .map((x) => +(x.story_points?.toString() ?? ""))
      .reduce((p, c) => p + c, 0);

    set_story_points(points);
  }, [bd_story_task_bug]);

  return {
    assignee_selected,
    story_points,
    bd_sprint_name,
    bd_squad_name,
    bd_status,
    bd_assignees,
    show_by,
    loadData,
    handleGroupBy,
    handleFilterAssignee,
    handleFileUpload,
    getStatus,
    getTotalTasks,
  };
};

export default useBoard;
