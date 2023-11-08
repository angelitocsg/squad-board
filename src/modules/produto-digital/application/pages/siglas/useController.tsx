import { useEffect, useState } from "react";

import { useService } from "../../../../../di/DecouplerContext";
import { StorageKey } from "../../../../../enums/StorageKey";
import { BackupService } from "../../../../../services/BackupService";
import AlertModalService from "../../../../core/components/AlertModal/AlertModalService";
import AppModalService from "../../../../core/components/AppModal/AppModalService";
import { IActions, IColumns } from "../../../../core/components/DisplayTable";
import { IHeaderActions } from "../../../../core/components/DisplayTable/headerActions";
import Sigla from "../../../domain/Sigla";
import SiglaRepository from "../../../repository/SiglaRepository";
import SiglaModel from "../../data/SiglaModel";
import SiglaStore from "../../data/SiglaStore";
import SiglaForm from "./form";

const useController = () => {
  const modalService = useService<AppModalService>("AppModalService");
  const alertService = useService<AlertModalService>("AlertModalService");
  const siglaStore = useService<SiglaStore>("SiglaStore");
  const siglaRepository = useService<SiglaRepository>("SiglaRepository");
  const [lines, setLines] = useState<SiglaModel[]>([]);
  const tColumns: IColumns[] = [
    { field: "id", title: "Sigla" },
    { field: "awsAccount", title: "AWS Account" },
    { field: "awsDevEnvironmentId", title: "ID DEV" },
    { field: "awsHomEnvironmentId", title: "ID HOM" },
    { field: "awsPrdEnvironmentId", title: "ID PROD" },
    { field: "descriptionTruncated", title: "Descrição" },
  ];

  useEffect(() => {
    document.title = "Produtos digitais | Squad";
  }, []);

  useEffect(() => {
    siglaRepository.getAll();
    var subscriber = siglaRepository.data$.subscribe((products) => {
      const _max = 20;
      const _description = (d?: string) =>
        (d ?? "").length > _max ? `${d?.substring(0, _max)}...` : d ? d : "-";
      setLines(
        products.map((product) => ({
          ...SiglaModel.fromDomain(product),
          descriptionTruncated: _description(
            SiglaModel.fromDomain(product).description,
          ),
        })),
      );
    });
    return () => {
      subscriber.unsubscribe();
    };
  }, [siglaRepository]);

  const handleSave = () => {
    try {
      const model = siglaStore.current;
      const sigla = Sigla.create(
        model.id,
        model.awsAccount,
        model.description,
        model.awsDevEnvironmentId,
        model.awsHomEnvironmentId,
        model.awsPrdEnvironmentId,
      );
      if (!model.id) siglaRepository.create(sigla);
      else siglaRepository.update(model.id, sigla);
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
    const model = new SiglaModel();
    siglaStore.updateCurrent(model);
    modalService
      .config({
        title: "nova sigla",
        size: "large",
        buttonOkLabel: "Criar",
        buttonOkAction: handleSave,
        children: () => (
          <SiglaForm
            data={model}
            onChange={(state) => {
              siglaStore.updateCurrent(state);
            }}
          />
        ),
      })
      .open();
  };

  const handleEdit = (line: SiglaModel) => {
    const model = lines.find((x) => x.id === line.id);
    if (!model) return;
    modalService
      .config({
        title: `editar produto digital (${line.id.split("-")[0]})`,
        size: "large",
        buttonOkLabel: "Salvar",
        buttonOkAction: handleSave,
        children: () => (
          <SiglaForm
            data={model}
            onChange={(state) => {
              siglaStore.updateCurrent(state);
            }}
          />
        ),
      })
      .open();
  };

  const handleDelete = (line: SiglaModel) => {
    if (window.confirm("Excluir sigla?")) siglaRepository.delete(line.id);
  };

  const handleImport = () => {
    BackupService.importCsvToData(StorageKey.DATA_SIGLA);
  };

  const handleExport = () => {
    BackupService.exportDataAsCsv(siglaRepository.export());
  };

  const tActions: IActions[] = [
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
