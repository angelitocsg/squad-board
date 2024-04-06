import { useEffect, useState } from "react";

import { useService } from "../../../../../di/DecouplerContext";
import { StorageKey } from "../../../../../enums/StorageKey";
import { BackupService } from "../../../../../services/BackupService";
import { IActions, IColumns } from "../../../../core/components/DisplayTable";
import { IHeaderActions } from "../../../../core/components/DisplayTable/headerActions";
import ConsumidorRepository from "../../../repository/ConsumidorRepository";
import ContatoRepository from "../../../repository/ContatoRepository";
import ConsumidorModel from "../../data/ConsumidorModel";
import ContatoModel from "../../data/ContatoModel";
import ContatoStore from "../../data/ContatoStore";

const useController = () => {
  const contatoStore = useService<ContatoStore>("ContatoStore");
  const contatoRepository = useService<ContatoRepository>("ContatoRepository");
  const consumidorRepository = useService<ConsumidorRepository>(
    "ConsumidorRepository",
  );
  const [lines, setLines] = useState<ContatoModel[]>([]);
  const [consumidores, setConsumidores] = useState<ConsumidorModel[]>([]);

  const tColumns: IColumns[] = [
    { field: "consumidor", title: "Consumidor" },
    { field: "nome", title: "Nome" },
    { field: "telefone", title: "Telefone" },
    { field: "email", title: "Email" },
  ];

  useEffect(() => {
    document.title = "Hub - Contatos | Squad";
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
    contatoRepository.getAll();
    const subscriber = contatoRepository.data$.subscribe((items) => {
      setLines(
        items.map((item) => ({
          ...ContatoModel.fromDomain(item),
          consumidor: consumidores.find((x) => x.id === item.consumidorId)
            ?.nomeFantasia,
        })),
      );
    });
    return () => {
      subscriber.unsubscribe();
    };
  }, [contatoRepository, consumidores]);

  const handleImport = () => {
    BackupService.importCsvToData(StorageKey.DATA_HUB_CONTATOS);
  };

  const handleExport = () => {
    BackupService.exportDataAsCsv(
      contatoRepository.export(),
      StorageKey.DATA_HUB_CONTATOS,
    );
  };

  const handleNew = () => contatoStore.handleNew();
  const handleEdit = (model: ContatoModel) => contatoStore.handleEdit(model);

  const tActions: IActions[] = [
    {
      label: "excluir",
      onClick: contatoStore.handleDelete,
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
