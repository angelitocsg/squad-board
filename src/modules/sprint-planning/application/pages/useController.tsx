import { useEffect, useState } from "react";

import { useService } from "../../../../di/DecouplerContext";
import AlertModalService from "../../../core/components/AlertModal/AlertModalService";
import AppModalService from "../../../core/components/AppModal/AppModalService";
import { IActions, IColumns } from "../../../core/components/DisplayTable";
import { IHeaderActions } from "../../../core/components/DisplayTable/headerActions";
import Task from "../../domain/Task";
import TaskRepository from "../../repository/TaskRepository";
import TaskModel from "../data/TaskModel";
import TaskStore from "../data/TaskStore";
import TaskForm from "./form";

const useController = () => {
  const modalService = useService<AppModalService>("AppModalService");
  const alertService = useService<AlertModalService>("AlertModalService");
  const taskStore = useService<TaskStore>("TaskStore");
  const taskRepository = useService<TaskRepository>("TaskRepository");
  const [lines, setLines] = useState<TaskModel[]>([]);
  const tColumns: IColumns[] = [
    { field: "parentId", title: "Nº item pai" },
    { field: "externalId", title: "Nº item" },
    { field: "title", title: "Título" },
    { field: "descriptionTruncated", title: "Descrição" },
    { field: "owner", title: "Responsável" },
    { field: "sprint", title: "Sprint" },
  ];

  useEffect(() => {
    document.title = "Planejamento de sprint | Squad";
  }, []);

  useEffect(() => {
    taskRepository.getAll();
    var subscriber = taskRepository.data$.subscribe(items => {
      const _max = 20;
      const _description = (d?: string) =>
        (d ?? "").length > _max ? `${d?.substring(0, _max)}...` : d ? d : "-";
      setLines(
        items.map(item => ({
          ...TaskModel.fromDomain(item),
          descriptionTruncated: _description(
            TaskModel.fromDomain(item).description,
          ),
        })),
      );
    });
    return () => {
      subscriber.unsubscribe();
    };
  }, [taskRepository]);

  const handleSave = () => {
    try {
      const model = taskStore.current;
      const task = Task.create(
        model.title,
        model.description,
        model.externalId,
        model.owner,
        model.sprint,
        model.parentId,
      );
      if (!model.id) taskRepository.create(task);
      else taskRepository.update(model.id, task.updateId(model.id));
      modalService.close();
    } catch (e: any) {
      showMessage("error", e.message);
    }
  };

  const showMessage = (type: "error" | "info", message: string) => {
    alertService
      .config({
        type: type,
        title: "Erro",
        buttonOkLabel: "Ok",
        buttonCancelHidden: true,
        children: () => <span>{message}</span>,
      })
      .open();
  };

  const handleNew = () => {
    const model = new TaskModel();
    taskStore.updateCurrent(model);
    modalService
      .config({
        title: "novo produto digital",
        size: "large",
        buttonOkLabel: "Criar",
        buttonOkAction: handleSave,
        children: () => (
          <TaskForm
            data={model}
            onChange={state => {
              taskStore.updateCurrent(state);
            }}
          />
        ),
      })
      .open();
  };

  const handleEdit = (line: TaskModel) => {
    const model = lines.find(x => x.id === line.id);
    if (!model) return;
    modalService
      .config({
        title: `editar produto digital (${line.id.split("-")[0]})`,
        size: "large",
        buttonOkLabel: "Salvar",
        buttonOkAction: handleSave,
        children: () => (
          <TaskForm
            data={model}
            onChange={state => {
              taskStore.updateCurrent(state);
            }}
          />
        ),
      })
      .open();
  };

  const handleDelete = (line: TaskModel) => {
    if (window.confirm("Excluir produto digital?"))
      taskRepository.delete(line.id);
  };

  const tActions: IActions[] = [
    {
      label: "excluir",
      onClick: handleDelete,
    },
  ];

  const tHeaderButtons: IHeaderActions = {
    buttonNew: {
      label: "Novo",
      action: handleNew,
    },
  };

  return { tActions, tColumns, tHeaderButtons, lines, handleNew, handleEdit };
};

export default useController;
