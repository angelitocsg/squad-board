import { useEffect, useState } from "react";

import { useService } from "../../../../di/DecouplerContext";
import AlertModalService, {
  modalType,
} from "../../../core/components/AlertModal/AlertModalService";
import { IActions, IColumns } from "../../../core/components/DynamicTable";
import { IHeaderActions } from "../../../core/components/DynamicTable/headerActions";
import Task from "../../domain/Task";
import TaskRepository from "../../repository/TaskRepository";
import TaskModel from "../data/TaskModel";
import { BackupService } from "../../../../services/BackupService";
import { StorageKey } from "../../../../enums/StorageKey";

const useController = () => {
  const alertService = useService<AlertModalService>("AlertModalService");
  const taskRepository = useService<TaskRepository>("TaskRepository");
  const [lines, setLines] = useState<TaskModel[]>([]);
  const [emptyLine, setEmptyLine] = useState(new TaskModel());

  const tColumns: IColumns[] = [
    { field: "parentId", title: "Nº item pai", width: 140 },
    { field: "taskId", title: "Nº item", width: 140 },
    {
      field: "type",
      title: "Tipo",
      width: 100,
      datalist: ["Story", "Task", "Bug", "Subtask"],
    },
    { field: "description", title: "Descrição", required: true, indent: true },
    { field: "owner", title: "Responsável", width: 150 },
    {
      field: "sprint",
      title: "Sprint",
      width: 60,
      datalist: ["SP1", "SP2", "SP3", "SP4", "SP5", "SP6"],
    },
    {
      field: "status",
      title: "Status",
      width: 100,
      datalist: ["Backlog", "A fazer", "Em andamento", "Concluída"],
    },
  ];

  useEffect(() => {
    document.title = "Planejamento de sprint | Squad";
  }, []);

  useEffect(() => {
    taskRepository.getAll();
    var subscriber = taskRepository.data$.subscribe((items) => {
      const newEmpty = new TaskModel();
      setEmptyLine(newEmpty);
      if (items.length === 0) {
        setLines([newEmpty]);
        return;
      }
      setLines([
        ...items.map((item) => ({
          ...TaskModel.fromDomain(item),
          description:
            item.parentId && item.type?.toLowerCase().indexOf("sub") !== -1
              ? `\t\t${item.description}`
              : item.description,
        })),
        newEmpty,
      ]);
    });
    return () => {
      subscriber.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskRepository]);

  const handleFieldChange = (line: TaskModel, field: any, value: any) => {
    const linesUpdated = lines.map((curLine) =>
      curLine.id === line.id ? { ...curLine, [field]: value } : curLine,
    );
    if (line.id === emptyLine.id) {
      const newEmpty = new TaskModel();
      setEmptyLine(newEmpty);
      linesUpdated.push(newEmpty);
    }
    setLines(linesUpdated);
  };

  const handleSave = () => {
    try {
      taskRepository.clear();
      lines.forEach((line) => {
        const model = line;
        if (!model.description) return;
        const task = Task.create(
          model.description?.trim(),
          model.parentId,
          model.taskId,
          model.type,
          model.owner,
          model.sprint,
          model.status,
        );
        task.updateId(model.id);
        taskRepository.create(task);
      });
      showMessage("success", "Salvo com sucesso", "Aviso");
      setTimeout(() => {
        alertService.close();
      }, 1000);
    } catch (e: any) {
      showMessage("error", e.message);
    }
  };

  const showMessage = (
    type: modalType,
    message: string,
    title: string = "Erro",
  ) => {
    alertService
      .config({
        type: type,
        title: title,
        buttonOkLabel: "Ok",
        buttonCancelHidden: true,
        children: () => <span>{message}</span>,
      })
      .open();
  };

  const handleImport = () => {
    BackupService.importCsvToData(StorageKey.DATA_TASK_PLANNING);
  };

  const handleExport = () => {
    BackupService.exportDataAsCsv(
      lines.filter((x) => x.description),
      StorageKey.DATA_TASK_PLANNING,
    );
  };

  const handleDelete = (line: TaskModel) => {
    if (window.confirm("Excluir item?")) taskRepository.delete(line.id);
  };

  const tActions: IActions[] = [
    {
      label: "excluir",
      onClick: handleDelete,
    },
  ];

  const tHeaderButtons: IHeaderActions = {
    buttonSave: {
      label: "Salvar",
      action: handleSave,
    },
    buttonImport: {
      label: "Importar",
      action: handleImport,
    },
    buttonExport: {
      label: "Exportar",
      action: handleExport,
    },
  };

  return { tActions, tColumns, tHeaderButtons, lines, handleFieldChange };
};

export default useController;
