import Acesso from "../../domain/Acesso";

export default class AcessoModel {
  id: string = "";
  apiKey: string = "";
  sigla: string = "";
  escopos: string[] = [];

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
