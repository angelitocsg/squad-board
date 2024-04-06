import dateHelper from "../../../../helpers/date.helper";
import Consumidor from "../../domain/Consumidor";

export default class ConsumidorModel {
  id: string = "";
  cnpj: string = "";
  razaoSocial: string = "";
  nomeFantasia: string = "";
  responsavel: string = "";
  dataCadastro: string = "";
  dataAcessoDoc: string = "";
  dataAcessoAuthHierarquia: string = "";
  dataAcessoWhitelist: string = "";
  observacoes: string = "";
  ativo: boolean = false;

  constructor() {
    this.dataCadastro = dateHelper.format(new Date(), "dd/MM/yyyy hh:mm");
  }

  static fromDomain(entity: Consumidor): ConsumidorModel {
    return {
      id: entity.id,
      cnpj: entity.cnpj,
      razaoSocial: entity.razaoSocial,
      nomeFantasia: entity.nomeFantasia,
      responsavel: entity.responsavel,
      dataCadastro: entity.dataCadastro,
      dataAcessoDoc: entity.dataAcessoDoc,
      dataAcessoAuthHierarquia: entity.dataAcessoAuthHierarquia,
      dataAcessoWhitelist: entity.dataAcessoWhitelist,
      observacoes: entity.observacoes,
      ativo: entity.ativo,
    };
  }

  static toDomain(model: ConsumidorModel) {
    return Consumidor.restore(
      model.id,
      model.cnpj,
      model.razaoSocial,
      model.nomeFantasia,
      model.responsavel,
      model.dataCadastro,
      model.dataAcessoDoc,
      model.dataAcessoAuthHierarquia,
      model.dataAcessoWhitelist,
      model.observacoes,
      model.ativo,
    );
  }
}
