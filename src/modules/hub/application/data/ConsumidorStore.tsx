import { BehaviorSubject } from "rxjs";

import { useService } from "../../../../di/DecouplerContext";
import AlertModalService from "../../../core/components/AlertModal/AlertModalService";
import AppModalService from "../../../core/components/AppModal/AppModalService";
import Consumidor from "../../domain/Consumidor";
import ConsumidorRepository from "../../repository/ConsumidorRepository";
import ConsumidorForm from "../pages/form";
import ConsumidorModel from "./ConsumidorModel";

const initialState = new ConsumidorModel();

export default class ConsumidorStore {
  private _current: BehaviorSubject<ConsumidorModel> = new BehaviorSubject(
    initialState,
  );
  get current$() {
    return this._current.asObservable();
  }
  get current() {
    return this._current.value;
  }

  constructor() {
    this.handleSave.bind(this);
    this.showMessage.bind(this);
  }

  updateCurrent(model: ConsumidorModel) {
    this._current.next(model);
  }

  private modalService = useService<AppModalService>("AppModalService");
  private alertService = useService<AlertModalService>("AlertModalService");
  private consumidorRepository = useService<ConsumidorRepository>(
    "ConsumidorRepository",
  );

  handleNew() {
    const model = new ConsumidorModel();
    this.updateCurrent(model);
    this.modalService
      .config({
        title: "novo consumidor",
        size: "xlarge",
        buttonOkLabel: "Criar",
        buttonOkAction: this.handleSave.bind(this),
        children: () => (
          <ConsumidorForm
            data={model}
            onChange={(state) => {
              this.updateCurrent(state);
            }}
          />
        ),
      })
      .open();
  }

  handleEdit(model: ConsumidorModel) {
    if (!model) return;
    this.modalService
      .config({
        title: `editar consumidor (${model.id.split("-")[0]})`,
        size: "xlarge",
        buttonOkLabel: "Salvar",
        buttonOkAction: this.handleSave.bind(this),
        children: () => (
          <ConsumidorForm
            data={model}
            onChange={(state) => {
              this.updateCurrent(state);
            }}
          />
        ),
      })
      .open();
  }

  handleSave() {
    try {
      const model = this.current;
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
      if (!model.id) this.consumidorRepository.create(consumidor);
      else
        this.consumidorRepository.update(
          model.id,
          consumidor.updateId(model.id),
        );
      this.modalService.close();
    } catch (e: any) {
      this.showMessage("error", e.message);
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
