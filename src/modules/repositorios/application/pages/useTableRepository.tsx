import { useEffect, useState } from "react";

import { useService } from "../../../../di/DecouplerContext";
import { StorageKey } from "../../../../enums/StorageKey";
import { BackupService } from "../../../../services/BackupService";
import AlertModalService from "../../../core/components/AlertModal/AlertModalService";
import AppModalService from "../../../core/components/AppModal/AppModalService";
import { IActions, IColumns } from "../../../core/components/DisplayTable";
import { IHeaderActions } from "../../../core/components/DisplayTable/headerActions";
import GmudModel from "../../../gestao-mudanca/application/data/GmudModel";
import GmudRepository from "../../../gestao-mudanca/repository/GmudRepository";
import ProductModel from "../../../produto-digital/application/data/ProductModel";
import ProductRepository from "../../../produto-digital/repository/ProductRepository";
import RepoRepository, { TFilterRepo } from "../../repository/RepoRepository";
import RepoModel from "../data/RepoModel";
import RepoStore from "../data/RepoStore";
import RepoForm from "./form";

const useTableRepository = () => {
  const modalService = useService<AppModalService>("AppModalService");
  const alertService = useService<AlertModalService>("AlertModalService");
  const repoStore = useService<RepoStore>("RepoStore");
  const productRepository = useService<ProductRepository>("ProductRepository");
  const repoRepository = useService<RepoRepository>("RepoRepository");
  const gmudRepository = useService<GmudRepository>("GmudRepository");
  const [products, setProducts] = useState<ProductModel[]>([]);
  const [gmuds, setGmuds] = useState<GmudModel[]>([]);
  const [lines, setLines] = useState<RepoModel[]>([]);

  useEffect(() => {
    productRepository.getAll();
    const subscriber = productRepository.data$.subscribe((items) => {
      setProducts(items.map((item) => ProductModel.fromDomain(item)));
    });
    return () => {
      subscriber.unsubscribe();
    };
  }, [productRepository]);

  useEffect(() => {
    gmudRepository.getAll();
    const subscriber = gmudRepository.data$.subscribe((items) => {
      setGmuds(items.map((item) => GmudModel.fromDomain(item)));
    });
    return () => {
      subscriber.unsubscribe();
    };
  }, [gmudRepository]);

  useEffect(() => {
    const subscriber = repoRepository.data$.subscribe((items) => {
      setLines(
        items.map((item) => {
          return {
            ...RepoModel.fromDomain(item),
            product: products.find((x) => x.id === item.productId)?.name,
            repoName: item.repository.split("/")[1],
            gmuds:
              gmuds.filter((x) => x.repositoryId === item.id).length === 0
                ? ""
                : "SIM",
          };
        }),
      );
    });
    return () => {
      subscriber.unsubscribe();
    };
  }, [products, repoRepository]);

  const loadRepositories = (filter?: TFilterRepo) => {
    repoRepository.getAll(filter);
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

  const handleGithub = (line: RepoModel) => {
    const dlAnchorElem = document.createElement("a");
    dlAnchorElem?.setAttribute("href", `http://github.com/${line.repository}`);
    dlAnchorElem?.setAttribute("target", "_blank");
    dlAnchorElem?.setAttribute("rel", "noopener noreferrer");
    dlAnchorElem?.click();
    dlAnchorElem?.remove();
  };

  const handleDelete = (line: RepoModel) => {
    if (window.confirm("Excluir repositório?")) repoRepository.delete(line.id);
  };

  const handleSave = () => {
    try {
      const model = repoStore.current;
      const repo = RepoModel.toDomain(model);
      if (!model.id) repoRepository.create(repo);
      else repoRepository.update(model.id, repo.updateId(model.id));
      modalService.close();
    } catch (e: any) {
      showMessage("error", e.message);
    }
  };

  const handleNew = () => {
    const model = new RepoModel();
    repoStore.updateCurrent(model);
    modalService
      .config({
        title: "novo repositório",
        size: "large",
        buttonOkLabel: "Criar",
        buttonOkAction: handleSave,
        children: () => (
          <RepoForm
            data={model}
            onChange={(state) => {
              repoStore.updateCurrent(state);
            }}
          />
        ),
      })
      .open();
  };

  const handleEdit = (line: RepoModel) => {
    const model = lines.find((x) => x.id === line.id);
    if (!model) return;
    modalService
      .config({
        title: `editar repositório (${line.id.split("-")[0]})`,
        size: "large",
        buttonOkLabel: "Salvar",
        buttonOkAction: handleSave,
        children: () => (
          <RepoForm
            data={model}
            onChange={(state) => {
              repoStore.updateCurrent(state);
            }}
          />
        ),
      })
      .open();
  };

  const handleImport = () => {
    BackupService.importCsvToData(StorageKey.DATA_REPOSITORIOS);
  };

  const handleExport = () => {
    BackupService.exportDataAsCsv(
      repoRepository.export(),
      StorageKey.DATA_REPOSITORIOS,
    );
  };

  const tColumns: IColumns[] = [
    { field: "product", title: "Produto" },
    { field: "description", title: "Descrição" },
    { field: "repoName", title: "Repositório" },
    { field: "type", title: "Tipo" },
    { field: "deploySequence", title: "Sequência" },
    { field: "codeBase", title: "Code base" },
    { field: "siglaApp", title: "Sigla App" },
    { field: "pipelineVersion", title: "Pipeline" },
    { field: "gmuds", title: "Gmuds" },
  ];

  const tActionsView: IActions[] = [
    {
      label: "github",
      onClick: handleGithub,
    },
  ];

  const tActions: IActions[] = [
    ...tActionsView,
    {
      label: "excluir",
      onClick: handleDelete,
    },
  ];

  const tHeaderButtonsView: IHeaderActions = {
    buttonNew: {
      label: "Novo",
      action: handleNew,
    },
  };

  const tHeaderButtons: IHeaderActions = {
    ...tHeaderButtonsView,
    buttonImport: {
      label: "Importar",
      action: handleImport,
    },
    buttonExport: {
      label: "Exportar",
      action: handleExport,
    },
  };

  return {
    tActionsView,
    tActions,
    tHeaderButtonsView,
    tHeaderButtons,
    tColumns,
    lines,
    loadRepositories,
    handleEdit,
  };
};

export default useTableRepository;
