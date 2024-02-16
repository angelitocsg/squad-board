import dateHelper from "../../../../helpers/date.helper";
import Consumidor from "../../domain/Consumidor";

export default class ConsumidorModel {
  id: string = "";
  cnpj: string = "";
  razaoSocial: string = "";
  nomeFantasia: string = "";
  dataCadastro: string = "";
  responsavel: string = "";
  acessoDocto: boolean = false;
  acessoViaHierarquia: boolean = false;
  ativo: boolean = false;

  constructor() {
    this.dataCadastro = dateHelper.format(new Date(), "dd/MM/yyyy hh:mm:ss");
  }

  static fromDomain(entity: Consumidor): ConsumidorModel {
    return {
      id: entity.id,
      cnpj: entity.cnpj,
      razaoSocial: entity.razaoSocial,
      nomeFantasia: entity.nomeFantasia,
      dataCadastro: entity.dataCadastro,
      responsavel: entity.responsavel,
      acessoDocto: entity.acessoDocto,
      acessoViaHierarquia: entity.acessoViaHierarquia,
      ativo: entity.ativo,
    };
  }

  static toDomain(model: ConsumidorModel) {
    return Consumidor.restore(
      model.id,
      model.cnpj,
      model.razaoSocial,
      model.nomeFantasia,
      model.dataCadastro,
      model.responsavel,
      model.acessoDocto,
      model.acessoViaHierarquia,
      model.ativo,
    );
  }
}
