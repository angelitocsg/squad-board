import { useEffect, useState } from "react";

import { useService } from "../../../../../di/DecouplerContext";
import { StorageKey } from "../../../../../enums/StorageKey";
import { BackupService } from "../../../../../services/BackupService";
import { IActions, IColumns } from "../../../../core/components/DisplayTable";
import { IHeaderActions } from "../../../../core/components/DisplayTable/headerActions";
import AcessoRepository from "../../../repository/AcessoRepository";
import ConsumidorRepository from "../../../repository/ConsumidorRepository";
import AcessoModel from "../../data/AcessoModel";
import AcessoStore from "../../data/AcessoStore";
import ConsumidorModel from "../../data/ConsumidorModel";

const useController = () => {
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

  const handleImport = () => {
    BackupService.importCsvToData(StorageKey.DATA_HUB_ACESSOS);
  };

  const handleExport = () => {
    BackupService.exportDataAsCsv(
      acessoRepository.export(),
      StorageKey.DATA_HUB_ACESSOS,
    );
  };

  const handleNew = () => acessoStore.handleNew();
  const handleEdit = (model: AcessoModel) => acessoStore.handleEdit(model);

  const tActions: IActions[] = [
    {
      label: "excluir",
      onClick: acessoStore.handleDelete,
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
