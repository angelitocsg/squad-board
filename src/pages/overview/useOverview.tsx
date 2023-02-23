import { useEffect, useState } from "react";
import showdown from "showdown";
import { v4 as uuidv4 } from "uuid";
import { PriorityEnum } from "../../interfaces/BoardIssues";

import { IMember, IOverview, IOverviewTask } from "../../models/IOverview";
import { ImportService } from "../../services/ImportService";

const useOverview = () => {
  const [overview_tasks, set_overview_tasks] = useState<IOverviewTask[]>([]);
  const [overview_members, set_overview_members] = useState<IMember[]>([]);

  const handleLoadFile = (data: string) => {
    ImportService.ImportOverviewJson(data);
    setTimeout(() => {
      window.location.reload();
    }, 200);
  };

  const handleDownloadFile = () => {
    const exportData: IOverview = {
      members: overview_members,
      tasks: overview_tasks,
    };

    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(exportData));
    const dlAnchorElem = document.createElement("a");
    dlAnchorElem?.setAttribute("href", dataStr);
    dlAnchorElem?.setAttribute("download", `overview_${Date.now()}.json`);
    dlAnchorElem?.click();
    dlAnchorElem?.remove();
  };

  const getAsMarkdown = (text?: string) => {
    if (!text) return "";
    const converter = new showdown.Converter();
    return converter.makeHtml(text);
  };

  const loadData = () => {
    let ls = localStorage.getItem("overview_tasks") ?? "[]";

    if (ls)
      set_overview_tasks(
        (JSON.parse(ls) as IOverviewTask[]).sort((a, b) =>
          +a.order > +b.order ? 0 : -1
        )
      );
    ls = localStorage.getItem("overview_members") ?? "[]";
    if (ls) set_overview_members(JSON.parse(ls) as IMember[]);
  };

  const handleTaskValueChange = (id: string, name: string, value: string) => {
    const tasksUpdated = overview_tasks.map((task) =>
      task.id === id ? { ...task, [name]: value } : task
    );

    set_overview_tasks(tasksUpdated);
  };

  const addLine = () => {
    const newTask: IOverviewTask = {
      order: 0,
      priority: PriorityEnum.MEDIUM,
      id: uuidv4(),
    };
    const tasksUpdated = [...overview_tasks, newTask];
    set_overview_tasks(tasksUpdated);
  };

  const removeLine = (id: string) => {
    if (!window.confirm("Remover linha?")) return;
    const tasksUpdated = overview_tasks.filter((t) => t.id !== id);
    set_overview_tasks(tasksUpdated);
  };

  useEffect(() => {
    if (overview_tasks && overview_tasks.length > 0)
      localStorage.setItem("overview_tasks", JSON.stringify(overview_tasks));
  }, [overview_tasks]);

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    overview_tasks,
    overview_members,
    addLine,
    removeLine,
    getAsMarkdown,
    handleLoadFile,
    handleDownloadFile,
    handleTaskValueChange,
  };
};

export default useOverview;
