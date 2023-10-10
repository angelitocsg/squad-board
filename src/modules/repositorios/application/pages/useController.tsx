import { useEffect } from "react";

import { useService } from "../../../../di/DecouplerContext";
import AlertModalService from "../../../core/components/AlertModal/AlertModalService";
import AppModalService from "../../../core/components/AppModal/AppModalService";
import { IHeaderActions } from "../../../core/components/DisplayTable/headerActions";
import Repo from "../../domain/Repo";
import RepoRepository from "../../repository/RepoRepository";
import RepoModel from "../data/RepoModel";
import RepoStore from "../data/RepoStore";
import RepoForm from "./form";
import useTableRepository from "./useTableRepository";

const useController = () => {
  const modalService = useService<AppModalService>("AppModalService");
  const alertService = useService<AlertModalService>("AlertModalService");
  const repoStore = useService<RepoStore>("RepoStore");
  const repoRepository = useService<RepoRepository>("RepoRepository");
  const { tActions, tColumns, lines, loadRepositories } = useTableRepository();

  useEffect(() => {
    loadRepositories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.title = "Repositórios | Squad";
  }, []);

  const handleSave = () => {
    try {
      const model = repoStore.current;
      const repo = Repo.create(
        model.productId,
        model.repository,
        model.type,
        model.deploySequence,
        model.siglaApp,
      );
      if (!model.id) repoRepository.create(repo);
      else repoRepository.update(model.id, repo.updateId(model.id));
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
            onChange={state => {
              repoStore.updateCurrent(state);
            }}
          />
        ),
      })
      .open();
  };

  const handleEdit = (line: RepoModel) => {
    const model = lines.find(x => x.id === line.id);
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
            onChange={state => {
              repoStore.updateCurrent(state);
            }}
          />
        ),
      })
      .open();
  };

  const tHeaderButtons: IHeaderActions = {
    buttonNew: {
      label: "Novo",
      action: handleNew,
    },
  };

  return { tActions, tColumns, tHeaderButtons, lines, handleNew, handleEdit };
};

export default useController;
