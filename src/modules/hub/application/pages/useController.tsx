import { useEffect, useState } from "react";

import { useService } from "../../../../di/DecouplerContext";
import { StorageKey } from "../../../../enums/StorageKey";
import { BackupService } from "../../../../services/BackupService";
import AlertModalService from "../../../core/components/AlertModal/AlertModalService";
import AppModalService from "../../../core/components/AppModal/AppModalService";
import { IActions, IColumns } from "../../../core/components/DisplayTable";
import { IHeaderActions } from "../../../core/components/DisplayTable/headerActions";
import Consumidor from "../../domain/Consumidor";
import ConsumidorRepository from "../../repository/ConsumidorRepository";
import ConsumidorModel from "../data/ConsumidorModel";
import ConsumidorStore from "../data/ConsumidorStore";
import ConsumidorForm from "./form";

const useController = () => {
  const modalService = useService<AppModalService>("AppModalService");
  const alertService = useService<AlertModalService>("AlertModalService");
  const consumidorStore = useService<ConsumidorStore>("ConsumidorStore");
  const consumidorRepository = useService<ConsumidorRepository>(
    "ConsumidorRepository",
  );
  const [lines, setLines] = useState<ConsumidorModel[]>([]);

  const tColumns: IColumns[] = [
    { field: "cnpj", title: "CNPJ" },
    { field: "razaoSocial", title: "Razão Social" },
    { field: "nomeFantasia", title: "Nome fantasia" },
    { field: "dataCadastro", title: "Data cadastro" },
    { field: "acessoDoctoSimNao", title: "Documentação" },
    { field: "acessoViaHierarquiaSimNao", title: "Via hierarquia" },
    { field: "num_contatos", title: "Contatos" },
    { field: "num_acessos", title: "Acesos" },
    { field: "ativoSimNao", title: "Ativo" },
  ];

  useEffect(() => {
    document.title = "Hub | Squad";
  }, []);

  useEffect(() => {
    consumidorRepository.getAll();
    const subscriber = consumidorRepository.data$.subscribe((items) => {
      setLines(
        items.map((item) => {
          const model = ConsumidorModel.fromDomain(item);
          return {
            ...model,
            acessoDoctoSimNao: model.acessoDocto ? "SIM" : "NÃO",
            acessoViaHierarquiaSimNao: model.acessoViaHierarquia
              ? "SIM"
              : "NÃO",
            ativoSimNao: model.ativo ? "SIM" : "NÃO",
          };
        }),
      );
    });
    return () => {
      subscriber.unsubscribe();
    };
  }, [consumidorRepository]);

  const handleSave = () => {
    try {
      const model = consumidorStore.current;
      const consumidor = Consumidor.create(
        model.cnpj,
        model.razaoSocial,
        model.nomeFantasia,
        model.dataCadastro,
        model.responsavel,
        model.acessoDocto,
        model.acessoViaHierarquia,
        model.ativo,
      );
      if (!model.id) consumidorRepository.create(consumidor);
      else consumidorRepository.update(model.id, consumidor.updateId(model.id));
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
    const model = new ConsumidorModel();
    consumidorStore.updateCurrent(model);
    modalService
      .config({
        title: "novo consumidor",
        size: "xlarge",
        buttonOkLabel: "Criar",
        buttonOkAction: handleSave,
        children: () => (
          <ConsumidorForm
            data={model}
            onChange={(state) => {
              consumidorStore.updateCurrent(state);
            }}
          />
        ),
      })
      .open();
  };

  const handleEdit = (line: ConsumidorModel) => {
    const model = lines.find((x) => x.id === line.id);
    if (!model) return;
    modalService
      .config({
        title: `editar consumidor (${line.id.split("-")[0]})`,
        size: "xlarge",
        buttonOkLabel: "Salvar",
        buttonOkAction: handleSave,
        children: () => (
          <ConsumidorForm
            data={model}
            onChange={(state) => {
              consumidorStore.updateCurrent(state);
            }}
          />
        ),
      })
      .open();
  };

  const handleDelete = (line: ConsumidorModel) => {
    if (window.confirm("Excluir consumidor?"))
      consumidorRepository.delete(line.id);
  };

  const handleImport = () => {
    BackupService.importCsvToData(StorageKey.DATA_HUB_CONSUMIDORES, [
      "acessos",
      "contatos",
    ]);
  };

  const handleExport = () => {
    BackupService.exportDataAsCsv(
      consumidorRepository.export(),
      StorageKey.DATA_HUB_CONSUMIDORES,
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
