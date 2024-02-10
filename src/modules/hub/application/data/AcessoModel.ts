import Acesso from "../../domain/Acesso";
import { v4 as uuidv4 } from "uuid";

export default class AcessoModel {
  id: string = "";
  apiKey: string = "";
  sigla: string = "";
  escopos: string = "";

  constructor() {
    this.id = uuidv4();
    this.apiKey = "";
    this.sigla = "";
    this.escopos = "";
  }

  static fromDomain(entity: Acesso): AcessoModel {
    return {
      id: entity.id,
      apiKey: entity.apiKey,
      sigla: entity.sigla,
      escopos: entity.escopos,
    };
  }

  static toDomain(model: AcessoModel) {
    return Acesso.restore(model.id, model.apiKey, model.sigla, model.escopos);
  }
}
