import { useEffect, useState } from "react";

import { useService } from "../../../../di/DecouplerContext";
import { GmudStatus } from "../../../../enums/GmudStatus";
import { StorageKey } from "../../../../enums/StorageKey";
import { BackupService } from "../../../../services/BackupService";
import AlertModalService from "../../../core/components/AlertModal/AlertModalService";
import AppModalService from "../../../core/components/AppModal/AppModalService";
import { IActions, IColumns } from "../../../core/components/DisplayTable";
import { IHeaderActions } from "../../../core/components/DisplayTable/headerActions";
import RepoModel from "../../../repositorios/application/data/RepoModel";
import RepoRepository from "../../../repositorios/repository/RepoRepository";
import Gmud from "../../domain/Gmud";
import GmudRepository from "../../repository/GmudRepository";
import GmudModel from "../data/GmudModel";
import GmudStore from "../data/GmudStore";
import GmudForm from "./form";

const useController = () => {
  const modalService = useService<AppModalService>("AppModalService");
  const alertService = useService<AlertModalService>("AlertModalService");
  const gmudStore = useService<GmudStore>("GmudStore");
  const gmudRepository = useService<GmudRepository>("GmudRepository");
  const [lines, setLines] = useState<GmudModel[]>([]);
  const repoRepository = useService<RepoRepository>("RepoRepository");
  const [repositories, setRepositories] = useState<RepoModel[]>([]);

  const tColumns: IColumns[] = [
    { field: "number", title: "Número" },
    { field: "story", title: "Tarefa" },
    { field: "version", title: "Versão" },
    { field: "date", title: "Data" },
    { field: "time", title: "Hora" },
    { field: "status", title: "Status" },
    { field: "repository", title: "Repositório" },
    { field: "owner", title: "Responsável" },
    { field: "description", title: "Descrição" },
  ];

  useEffect(() => {
    document.title = "Gestão de Mudanças | Squad";
  }, []);

  useEffect(() => {
    repoRepository.getAll();
    var subscriber = repoRepository.data$.subscribe((items) => {
      setRepositories(items.map((item) => RepoModel.fromDomain(item)));
    });
    return () => {
      subscriber.unsubscribe();
    };
  }, [repoRepository]);

  useEffect(() => {
    gmudRepository.getAll();
    var subscriber = gmudRepository.data$.subscribe((items) => {
      setLines(
        items.map((item) => {
          return {
            ...GmudModel.fromDomain(item),
            repository: repositories.find((x) => x.id === item.repositoryId)
              ?.repository,
          };
        }),
      );
    });
    return () => {
      subscriber.unsubscribe();
    };
  }, [gmudRepository, repositories]);

  const handleSave = () => {
    try {
      const model = gmudStore.current;
      const gmud = Gmud.create(
        model.story,
        model.repositoryId,
        model.version,
        model.owner,
        model.description,
      );
      if (model.number)
        gmud.register(
          model.number,
          model.link,
          model.version,
          model.owner,
          model.description,
        );
      if (model.date && model.time)
        gmud.schedule(
          model.date,
          model.time,
          model.version,
          model.owner,
          model.description,
        );
      if (!model.id) gmudRepository.create(gmud);
      else gmudRepository.update(model.id, gmud.updateId(model.id));
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
    const model = new GmudModel("");
    gmudStore.updateCurrent(model);
    modalService
      .config({
        title: "nova mudança",
        size: "large",
        buttonOkLabel: "Criar",
        buttonOkAction: handleSave,
        children: () => (
          <GmudForm
            data={model}
            onChange={(state) => {
              gmudStore.updateCurrent(state);
            }}
          />
        ),
      })
      .open();
  };

  const handleEdit = (line: GmudModel) => {
    const model = lines.find((x) => x.id === line.id);
    if (!model) return;
    if (model.status === GmudStatus.CANCELADA) {
      const message = "GMUD está cancelada e não é permitida edição";
      showMessage("info", message);
      return;
    }
    modalService
      .config({
        title: `editar mudança (${line.id.split("-")[0]})`,
        size: "large",
        buttonOkLabel: "Salvar",
        buttonOkAction: handleSave,
        children: () => (
          <GmudForm
            data={model}
            onChange={(state) => {
              gmudStore.updateCurrent(state);
            }}
          />
        ),
      })
      .open();
  };

  const handlePublish = (line: GmudModel) => {
    try {
      const gmud = GmudModel.toDomain(line).publish();
      if (window.confirm("Publicar GMUD?"))
        gmudRepository.update(gmud.id, gmud);
    } catch (e: any) {
      showMessage("error", e.message);
    }
  };
  const handleCancel = (line: GmudModel) => {
    try {
      const gmud = GmudModel.toDomain(line).cancel();
      if (window.confirm("Cancelar GMUD?")) gmudRepository.cancel(gmud.id);
    } catch (e: any) {
      showMessage("error", e.message);
    }
  };
  const handleDelete = (line: GmudModel) => {
    if (window.confirm("Excluir GMUD?")) gmudRepository.delete(line.id);
  };

  const handleImport = () => {
    BackupService.importCsvToData(StorageKey.DATA_GESTAO_MUDANCA);
  };

  const handleExport = () => {
    BackupService.exportDataAsCsv(
      gmudRepository.export(),
      StorageKey.DATA_GESTAO_MUDANCA,
    );
  };

  const tActions: IActions[] = [
    {
      label: "publicar",
      onClick: handlePublish,
    },
    {
      label: "cancelar",
      onClick: handleCancel,
    },
    {
      label: "excluir",
      onClick: handleDelete,
    },
  ];

  const tHeaderButtons: IHeaderActions = {
    buttonNew: {
      label: "Nova",
      action: handleNew,
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

  return { tActions, tColumns, tHeaderButtons, lines, handleNew, handleEdit };
};

export default useController;
