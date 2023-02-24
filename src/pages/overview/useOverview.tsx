import { useEffect, useState } from "react";
import showdown from "showdown";
import { v4 as uuidv4 } from "uuid";
import ExportHelper from "../../helpers/export.helper";

import { PriorityEnum, TPriority } from "../../interfaces/BoardIssues";
import {
  IMember,
  IOverview,
  IOverviewFeatures,
  IOverviewTask,
} from "../../models/IOverview";
import { ImportService, SEM_ALOCACAO } from "../../services/ImportService";

const useOverview = () => {
  const [overview_features, set_overview_features] = useState<
    IOverviewFeatures[]
  >([]);
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
      features: overview_features,
      members: overview_members,
      tasks: overview_tasks,
    };

    ExportHelper.jsonFile(exportData, "overview");
  };

  const getAsMarkdown = (text?: string) => {
    if (!text) return "";
    const converter = new showdown.Converter();
    return converter.makeHtml(text);
  };

  const getPriorityOrder = (priority?: TPriority) => {
    return priority === PriorityEnum.VERY_HIGH
      ? 5
      : priority === PriorityEnum.HIGH
      ? 4
      : priority === PriorityEnum.MEDIUM
      ? 3
      : priority === PriorityEnum.LOW
      ? 2
      : priority === PriorityEnum.VERY_LOW
      ? 1
      : 0;
  };

  const loadData = () => {
    let ls = localStorage.getItem("overview_tasks") ?? "[]";

    if (ls)
      set_overview_tasks(
        (JSON.parse(ls) as IOverviewTask[]).sort((a, b) =>
          getPriorityOrder(a.priority) > getPriorityOrder(b.priority) ? -1 : 0
        )
      );

    ls = localStorage.getItem("overview_members") ?? "[]";
    if (ls)
      set_overview_members(
        (JSON.parse(ls) as IMember[]).sort((a, b) =>
          a.name.localeCompare(b.name) ? 0 : -1
        )
      );

    ls = localStorage.getItem("overview_features") ?? "[]";
    if (ls)
      set_overview_features(
        (JSON.parse(ls) as IOverviewFeatures[]).sort((a, b) =>
          a.name.localeCompare(b.name) ? -1 : 0
        )
      );
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
      user: SEM_ALOCACAO,
    };
    const tasksUpdated = [...overview_tasks, newTask];
    set_overview_tasks(tasksUpdated);
  };

  const removeLine = (id: string) => {
    if (!window.confirm("Remover linha?")) return;
    const tasksUpdated = overview_tasks.filter((t) => t.id !== id);
    set_overview_tasks(tasksUpdated);
  };

  const getUserTasks = (user?: string): IOverviewTask[] => {
    return overview_tasks.filter(
      (f) => f.user === user || (user === "" && !f.user)
    );
  };

  const getFeatures = () => {
    return overview_features;
  };

  const getUsers = (): IMember[] => {
    const members: IMember[] = [];
    return [...members, ...overview_members];
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
    addLine,
    removeLine,
    getAsMarkdown,
    getFeatures,
    getUsers,
    getUserTasks,
    handleLoadFile,
    handleDownloadFile,
    handleTaskValueChange,
  };
};

export default useOverview;
