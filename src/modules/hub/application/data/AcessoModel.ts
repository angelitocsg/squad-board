import Acesso from "../../domain/Acesso";
import { v4 as uuidv4 } from "uuid";

export default class AcessoModel {
  id: string = "";
  consumidorId: string = "";
  apiKey: string = "";
  sigla: string = "";
  escopos: string = "";
  dataCadastro: string = "";
  ativo: boolean = false;

  constructor() {
    this.id = uuidv4();
    this.apiKey = "";
    this.sigla = "";
    this.escopos = "";
    this.dataCadastro = "";
    this.ativo = false;
  }

  static create(consumidorId: string): AcessoModel {
    const acesso = new AcessoModel();
    acesso.consumidorId = consumidorId;
    return acesso;
  }

  static fromDomain(entity: Acesso): AcessoModel {
    return {
      id: entity.id,
      consumidorId: entity.consumidorId,
      apiKey: entity.apiKey,
      sigla: entity.sigla,
      escopos: entity.escopos,
      dataCadastro: entity.dataCadastro,
      ativo: entity.ativo,
    };
  }

  static toDomain(model: AcessoModel) {
    return Acesso.restore(
      model.id,
      model.consumidorId,
      model.apiKey,
      model.sigla,
      model.escopos,
      model.dataCadastro,
      model.ativo,
    );
  }
}
