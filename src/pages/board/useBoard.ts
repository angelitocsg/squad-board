import { useEffect, useState } from "react";

import { IStatus } from "../../components/BoardColumnStatus";
import { BoardIssues } from "../../interfaces/BoardIssues";
import { ImportService } from "../../services/ImportService";

const useBoard = () => {
  const [assignee_selected, set_assignee_selected] = useState("");
  const [feature_selected, set_feature_selected] = useState("");
  const [status_selected, set_status_selected] = useState("");
  const [story_points, set_story_points] = useState({
    total: 0,
    ended: 0,
  });
  const [bd_status, set_bd_status] = useState<IStatus[]>([]);
  const [bd_sprint_name, set_bd_sprint_name] = useState("Sprint");
  const [bd_squad_name, set_bd_squad_name] = useState("squad");
  const [bd_story_task_bug, set_bd_story_task_bug] = useState<BoardIssues[]>(
    []
  );
  const [bd_assignees, set_bd_assignees] = useState<BoardIssues[]>([]);
  const [features, set_features] = useState<string[]>([]);
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
    set_status_selected("");
    set_feature_selected("");
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

  const _getLastShowByAssignee = () => {
    set_status_selected("");
    const last_show_by_copy: BoardIssues[] = JSON.parse(
      JSON.stringify(last_show_by)
    );
    return last_show_by_copy;
  };

  const _getLastShowByFeature = () => {
    set_status_selected("");
    set_assignee_selected("");
    const last_show_by_copy: BoardIssues[] = JSON.parse(
      JSON.stringify(last_show_by)
    );
    console.log({ last_show_by_copy });

    return last_show_by_copy;
  };

  const handleFilterAssignee = (assignee: string, composition?: boolean) => {
    set_feature_selected("");

    if (assignee_selected === assignee && !composition) {
      set_assignee_selected("");
      set_show_by(_getLastShowByAssignee());
      return last_show_by;
    }

    set_assignee_selected(assignee);

    const filterByAssignee = _getLastShowByAssignee().filter((f) => {
      const filtered = f.issues?.filter((s) => s.assignee === assignee);

      if (f.assignee === assignee || (filtered?.length ?? 0) > 0) {
        f.issues = filtered;
        return true;
      }
      return false;
    });

    set_show_by(filterByAssignee);
    return filterByAssignee;
  };

  const handleFilterFeature = (feature: string, composition?: boolean) => {
    if (feature_selected === feature && !composition) {
      set_feature_selected("");
      set_show_by(_getLastShowByFeature());
      return last_show_by;
    }

    set_feature_selected(feature);

    const filterByFeature = _getLastShowByFeature().filter((f) => {
      const filtered = f.issues?.filter((s) => s.parent_id === feature);

      console.log({ issues: f.issues, filtered, feature });
      console.table(f.issues);

      if (f.parent_id === feature || (filtered?.length ?? 0) > 0) {
        // f.issues = filtered;
        return true;
      }
      return false;
    });

    set_show_by(filterByFeature);
    return filterByFeature;
  };

  const _getLastShowByStatus = () => {
    let last_show_by_copy: BoardIssues[];

    if (assignee_selected) {
      last_show_by_copy = handleFilterAssignee(assignee_selected, true);
    } else if (feature_selected) {
      last_show_by_copy = handleFilterFeature(feature_selected, true);
    } else {
      last_show_by_copy = JSON.parse(JSON.stringify(last_show_by));
    }

    return last_show_by_copy;
  };

  const handleFilterByStatus = (status: string, composition?: boolean) => {
    const last_show_by_copy = _getLastShowByStatus();

    if (status_selected === status && !composition) {
      set_status_selected("");
      set_show_by(last_show_by_copy);
      return last_show_by;
    }

    set_status_selected(status);

    const filterByStatus = last_show_by_copy.filter((f) => {
      const filtered = f.issues?.filter((s) => s.status === status);

      if (f.status === status || (filtered?.length ?? 0) > 0) {
        f.issues = filtered;
        return true;
      }
      return false;
    });

    set_show_by(filterByStatus);
    return filterByStatus;
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

  const getTotalTasks = () => ({
    total: getStatus().reduce((p, c) => p + c.count, 0),
    ended: bd_story_task_bug.length,
  });

  const getFeatures = (): string[] => {
    if (features.length > 0) return features;

    const items: string[] = [];
    const result = show_by
      .map((x) => x.parent_id)
      .reduce((p, c) => {
        if (p.find((f) => f === c)) {
          return p;
        } else {
          if (c?.indexOf("FETR") !== -1 || c?.indexOf("SPNT") !== -1)
            p.push(c ?? "");
          return p;
        }
      }, items);

    set_features(result);
    return result;
  };

  useEffect(() => {
    document.title = "Tarefas | Squad";
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Default data
  useEffect(() => {
    set_show_by(bd_story_task_bug);
    set_last_show_by(bd_story_task_bug);

    const points = bd_story_task_bug
      .map((x) => +(x.story_points?.toString() ?? "0"))
      .reduce((p, c) => p + c, 0);

    const points_ended = bd_story_task_bug
      .filter((x) => x.status === "ENCERRADO/ATIVADO/CANCELADO")
      .map((x) => +(x.story_points?.toString() ?? "0"))
      .reduce((p, c) => p + c, 0);

    set_story_points({
      total: points,
      ended: points_ended,
    });
  }, [bd_story_task_bug]);

  return {
    assignee_selected,
    feature_selected,
    status_selected,
    story_points,
    bd_sprint_name,
    bd_squad_name,
    bd_status,
    bd_assignees,
    show_by,
    loadData,
    handleGroupBy,
    handleFilterAssignee,
    handleFilterByStatus,
    handleFileUpload,
    handleFilterFeature,
    getStatus,
    getTotalTasks,
    getFeatures,
  };
};

export default useBoard;
