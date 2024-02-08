import dateHelper from "../../../../helpers/date.helper";
import Consumidor from "../../domain/Consumidor";
import AcessoModel from "./AcessoModel";
import ContatoModel from "./ContatoModel";

export default class ConsumidorModel {
  id: string = "";
  cnpj: string = "";
  razaoSocial: string = "";
  nomeFantasia: string = "";
  dataCadastro: string = "";
  contatos: ContatoModel[] = [new ContatoModel()];
  acessos: AcessoModel[] = [new AcessoModel()];
  acessoDocto: boolean = false;
  acessoViaHierarquia: boolean = false;

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
      contatos: entity.contatos,
      acessos: entity.acessos,
      acessoDocto: entity.acessoDocto,
      acessoViaHierarquia: entity.acessoViaHierarquia,
    };
  }

  static toDomain(model: ConsumidorModel) {
    return Consumidor.restore(
      model.id,
      model.cnpj,
      model.razaoSocial,
      model.nomeFantasia,
      model.dataCadastro,
      model.contatos.map((x) => ContatoModel.toDomain(x)),
      model.acessos.map((x) => AcessoModel.toDomain(x)),
      model.acessoDocto,
      model.acessoViaHierarquia,
    );
  }
}
