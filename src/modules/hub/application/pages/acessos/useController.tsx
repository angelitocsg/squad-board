import { useEffect, useState } from "react";

import { useService } from "../../../../../di/DecouplerContext";
import { StorageKey } from "../../../../../enums/StorageKey";
import { BackupService } from "../../../../../services/BackupService";
import AlertModalService from "../../../../core/components/AlertModal/AlertModalService";
import AppModalService from "../../../../core/components/AppModal/AppModalService";
import { IActions, IColumns } from "../../../../core/components/DisplayTable";
import { IHeaderActions } from "../../../../core/components/DisplayTable/headerActions";
import Acesso from "../../../domain/Acesso";
import AcessoRepository from "../../../repository/AcessoRepository";
import ConsumidorRepository from "../../../repository/ConsumidorRepository";
import AcessoModel from "../../data/AcessoModel";
import AcessoStore from "../../data/AcessoStore";
import ConsumidorModel from "../../data/ConsumidorModel";
import AcessoForm from "./form";

const useController = () => {
  const modalService = useService<AppModalService>("AppModalService");
  const alertService = useService<AlertModalService>("AlertModalService");
  const acessoStore = useService<AcessoStore>("AcessoStore");
  const acessoRepository = useService<AcessoRepository>("AcessoRepository");
  const consumidorRepository = useService<ConsumidorRepository>(
    "ConsumidorRepository",
  );
  const [lines, setLines] = useState<AcessoModel[]>([]);
  const [consumidores, setConsumidores] = useState<ConsumidorModel[]>([]);

  const tColumns: IColumns[] = [
    { field: "consumidor", title: "Consumidor" },
    { field: "apiKey", title: "API Key" },
    { field: "sigla", title: "Sigla" },
    { field: "escopos", title: "Escopos" },
    { field: "dataCadastro", title: "Data cadastro" },
    { field: "ativoSimNao", title: "Ativo" },
  ];

  useEffect(() => {
    document.title = "Hub - Acessos | Squad";
  }, []);

  useEffect(() => {
    consumidorRepository.getAll();
    const subscriber = consumidorRepository.data$.subscribe((items) => {
      setConsumidores(items.map((item) => ConsumidorModel.fromDomain(item)));
    });
    return () => {
      subscriber.unsubscribe();
    };
  }, [consumidorRepository]);

  useEffect(() => {
    acessoRepository.getAll();
    const subscriber = acessoRepository.data$.subscribe((items) => {
      setLines(
        items.map((item) => ({
          ...AcessoModel.fromDomain(item),
          consumidor: consumidores.find((x) => x.id === item.consumidorId)
            ?.nomeFantasia,
          ativoSimNao: !!item.ativo ? "SIM" : "NÃO",
        })),
      );
    });
    return () => {
      subscriber.unsubscribe();
    };
  }, [acessoRepository, consumidores]);

  const handleSave = () => {
    try {
      const model = acessoStore.current;
      const acesso = Acesso.create(
        model.consumidorId,
        model.apiKey,
        model.sigla,
        model.escopos,
        model.dataCadastro,
        model.ativo,
      );
      if (!model.id) acessoRepository.create(acesso);
      else acessoRepository.update(model.id, acesso.updateId(model.id));
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
    const model = new AcessoModel();
    acessoStore.updateCurrent(model);
    modalService
      .config({
        title: "novo acesso",
        size: "xlarge",
        buttonOkLabel: "Criar",
        buttonOkAction: handleSave,
        children: () => (
          <AcessoForm
            data={model}
            onChange={(state) => {
              acessoStore.updateCurrent(state);
            }}
          />
        ),
      })
      .open();
  };

  const handleEdit = (line: AcessoModel) => {
    const model = lines.find((x) => x.id === line.id);
    if (!model) return;
    modalService
      .config({
        title: `editar acesso (${line.id.split("-")[0]})`,
        size: "xlarge",
        buttonOkLabel: "Salvar",
        buttonOkAction: handleSave,
        children: () => (
          <AcessoForm
            data={model}
            onChange={(state) => {
              acessoStore.updateCurrent(state);
            }}
          />
        ),
      })
      .open();
  };

  const handleDelete = (line: AcessoModel) => {
    if (window.confirm("Excluir acesso?")) acessoRepository.delete(line.id);
  };

  const handleImport = () => {
    BackupService.importCsvToData(StorageKey.DATA_HUB_ACESSOS);
  };

  const handleExport = () => {
    BackupService.exportDataAsCsv(
      acessoRepository.export(),
      StorageKey.DATA_HUB_ACESSOS,
    );
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
