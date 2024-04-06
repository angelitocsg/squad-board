import { BehaviorSubject } from "rxjs";

import { useService } from "../../../../di/DecouplerContext";
import AlertModalService from "../../../core/components/AlertModal/AlertModalService";
import AppModalService from "../../../core/components/AppModal/AppModalService";
import Acesso from "../../domain/Acesso";
import AcessoRepository from "../../repository/AcessoRepository";
import AcessoForm from "../pages/acessos/form";
import AcessoModel from "./AcessoModel";

const initialState = new AcessoModel();

export default class AcessoStore {
  private _current: BehaviorSubject<AcessoModel> = new BehaviorSubject(
    initialState,
  );
  get current$() {
    return this._current.asObservable();
  }
  get current() {
    return this._current.value;
  }

  updateCurrent(model: AcessoModel) {
    this._current.next(model);
  }

  private modalService = useService<AppModalService>("AppModalService");
  private alertService = useService<AlertModalService>("AlertModalService");
  private acessoRepository = useService<AcessoRepository>("AcessoRepository");

  handleNew(callback?: () => void) {
    const model = new AcessoModel();
    this.updateCurrent(model);
    this.modalService
      .config({
        title: "novo acesso",
        size: "xlarge",
        buttonOkLabel: "Criar",
        buttonOkAction: () => {
          if (this.handleSave()) callback && callback();
        },
        children: () => (
          <AcessoForm
            data={model}
            onChange={(state) => {
              this.updateCurrent(state);
            }}
          />
        ),
      })
      .open();
  }

  handleEdit(model: AcessoModel, callback?: () => void) {
    if (!model) return;
    this.modalService
      .config({
        title: `editar acesso (${model.id.split("-")[0]})`,
        size: "xlarge",
        buttonOkLabel: "Salvar",
        buttonOkAction: () => {
          if (this.handleSave()) callback && callback();
        },
        children: () => (
          <AcessoForm
            data={model}
            onChange={(state) => {
              this.updateCurrent(state);
            }}
          />
        ),
      })
      .open();
  }

  handleDelete(line: AcessoModel, callback?: () => void) {
    if (window.confirm("Excluir acesso?")) {
      this.acessoRepository.delete(line.id);
      callback && callback();
    }
  }

  handleSave(): boolean {
    try {
      const model = this.current;
      const acesso = Acesso.create(
        model.consumidorId,
        model.apiKey,
        model.sigla,
        model.escopos,
        model.dataCadastro,
        model.ativo,
      );
      if (!model.id) this.acessoRepository.create(acesso);
      else this.acessoRepository.update(model.id, acesso.updateId(model.id));
      this.modalService.close();
      return true;
    } catch (e: any) {
      this.showMessage("error", e.message);
      return false;
    }
  }

  showMessage = (type: "error" | "info", message: string) => {
    this.alertService
      .config({
        type: type,
        title: "Erro",
        buttonOkLabel: "Ok",
        buttonCancelHidden: true,
        children: () => <span>{message}</span>,
      })
      .open();
  };
}
