import { BehaviorSubject } from "rxjs";

import { useService } from "../../../../di/DecouplerContext";
import AlertModalService from "../../../core/components/AlertModal/AlertModalService";
import AppModalService from "../../../core/components/AppModal/AppModalService";
import Contato from "../../domain/Contato";
import ContatoRepository from "../../repository/ContatoRepository";
import ContatoForm from "../pages/contatos/form";
import ContatoModel from "./ContatoModel";

const initialState = new ContatoModel();

export default class ContatoStore {
  private _current: BehaviorSubject<ContatoModel> = new BehaviorSubject(
    initialState,
  );
  get current$() {
    return this._current.asObservable();
  }
  get current() {
    return this._current.value;
  }

  updateCurrent(model: ContatoModel) {
    this._current.next(model);
  }

  private modalService = useService<AppModalService>("AppModalService");
  private alertService = useService<AlertModalService>("AlertModalService");
  private contatoRepository =
    useService<ContatoRepository>("ContatoRepository");

  handleNew = (callback?: () => void) => {
    const model = new ContatoModel();
    this.updateCurrent(model);
    this.modalService
      .config({
        title: "novo contato",
        size: "xlarge",
        buttonOkLabel: "Criar",
        buttonOkAction: () => {
          if (this.handleSave()) callback && callback();
        },
        children: () => (
          <ContatoForm
            data={model}
            onChange={(state) => {
              this.updateCurrent(state);
            }}
          />
        ),
      })
      .open();
  };

  handleEdit(model: ContatoModel, callback?: () => void) {
    if (!model) return;
    this.modalService
      .config({
        title: `editar contato (${model.id.split("-")[0]})`,
        size: "xlarge",
        buttonOkLabel: "Salvar",
        buttonOkAction: () => {
          if (this.handleSave()) callback && callback();
        },
        children: () => (
          <ContatoForm
            data={model}
            onChange={(state) => {
              this.updateCurrent(state);
            }}
          />
        ),
      })
      .open();
  }

  handleDelete(line: ContatoModel, callback?: () => void) {
    if (window.confirm("Excluir contato?")) {
      this.contatoRepository.delete(line.id);
      callback && callback();
    }
  }

  handleSave(): boolean {
    try {
      const model = this.current;
      const contato = Contato.create(
        model.consumidorId,
        model.nome,
        model.telefone,
        model.email,
      );
      if (!model.id) this.contatoRepository.create(contato);
      else this.contatoRepository.update(model.id, contato.updateId(model.id));
      this.modalService.close();
      return true;
    } catch (e: any) {
      this.showMessage("error", e.message);
      return false;
    }
  }

  showMessage(type: "error" | "info", message: string) {
    this.alertService
      .config({
        type: type,
        title: "Erro",
        buttonOkLabel: "Ok",
        buttonCancelHidden: true,
        children: () => <span>{message}</span>,
      })
      .open();
  }
}
