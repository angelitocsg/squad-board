import { useEffect, useState } from "react";

import { useService } from "../../../../../di/DecouplerContext";
import { StorageKey } from "../../../../../enums/StorageKey";
import { BackupService } from "../../../../../services/BackupService";
import AlertModalService from "../../../../core/components/AlertModal/AlertModalService";
import AppModalService from "../../../../core/components/AppModal/AppModalService";
import { IActions, IColumns } from "../../../../core/components/DisplayTable";
import { IHeaderActions } from "../../../../core/components/DisplayTable/headerActions";
import Contato from "../../../domain/Contato";
import ConsumidorRepository from "../../../repository/ConsumidorRepository";
import ContatoRepository from "../../../repository/ContatoRepository";
import ConsumidorModel from "../../data/ConsumidorModel";
import ContatoModel from "../../data/ContatoModel";
import ContatoStore from "../../data/ContatoStore";
import ContatoForm from "./form";

const useController = () => {
  const modalService = useService<AppModalService>("AppModalService");
  const alertService = useService<AlertModalService>("AlertModalService");
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

  const handleSave = () => {
    try {
      const model = contatoStore.current;
      const contato = Contato.create(
        model.consumidorId,
        model.nome,
        model.telefone,
        model.email,
      );
      if (!model.id) contatoRepository.create(contato);
      else contatoRepository.update(model.id, contato.updateId(model.id));
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
    const model = new ContatoModel();
    contatoStore.updateCurrent(model);
    modalService
      .config({
        title: "novo contato",
        size: "xlarge",
        buttonOkLabel: "Criar",
        buttonOkAction: handleSave,
        children: () => (
          <ContatoForm
            data={model}
            onChange={(state) => {
              contatoStore.updateCurrent(state);
            }}
          />
        ),
      })
      .open();
  };

  const handleEdit = (line: ContatoModel) => {
    const model = lines.find((x) => x.id === line.id);
    if (!model) return;
    modalService
      .config({
        title: `editar contato (${line.id.split("-")[0]})`,
        size: "xlarge",
        buttonOkLabel: "Salvar",
        buttonOkAction: handleSave,
        children: () => (
          <ContatoForm
            data={model}
            onChange={(state) => {
              contatoStore.updateCurrent(state);
            }}
          />
        ),
      })
      .open();
  };

  const handleDelete = (line: ContatoModel) => {
    if (window.confirm("Excluir contato?")) contatoRepository.delete(line.id);
  };

  const handleImport = () => {
    BackupService.importCsvToData(StorageKey.DATA_HUB_CONTATOS);
  };

  const handleExport = () => {
    BackupService.exportDataAsCsv(
      contatoRepository.export(),
      StorageKey.DATA_HUB_CONTATOS,
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
