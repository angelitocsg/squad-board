import Consumidor from "../domain/Consumidor";

export default class ConsumidorDTO {
  id: string;
  cnpj: string;
  razaoSocial: string;
  nomeFantasia: string;
  dataCadastro: string;
  responsavel: string;
  acessoDocto: boolean;
  acessoViaHierarquia: boolean;
  ativo: boolean;

  constructor(entity: Consumidor) {
    this.id = entity.id;
    this.cnpj = entity.cnpj;
    this.razaoSocial = entity.razaoSocial;
    this.nomeFantasia = entity.nomeFantasia;
    this.dataCadastro = entity.dataCadastro;
    this.responsavel = entity.responsavel;
    this.acessoDocto = entity.acessoDocto;
    this.acessoViaHierarquia = entity.acessoViaHierarquia;
    this.ativo = entity.ativo;
  }

  static toDomain(dto: ConsumidorDTO) {
    return Consumidor.restore(
      dto.id,
      dto.cnpj,
      dto.razaoSocial,
      dto.nomeFantasia,
      dto.dataCadastro,
      dto.responsavel,
      dto.acessoDocto,
      dto.acessoViaHierarquia,
      dto.ativo,
    );
  }
}
