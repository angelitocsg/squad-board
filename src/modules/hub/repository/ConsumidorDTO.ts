import Consumidor from "../domain/Consumidor";

export default class ConsumidorDTO {
  id: string;
  cnpj: string;
  razaoSocial: string;
  nomeFantasia: string;
  responsavel: string;
  dataCadastro: string;
  dataAcessoDoc: string;
  dataAcessoAuthHierarquia: string;
  dataAcessoWhitelist: string;
  observacoes: string;
  ativo: boolean;

  constructor(entity: Consumidor) {
    this.id = entity.id;
    this.cnpj = entity.cnpj;
    this.razaoSocial = entity.razaoSocial;
    this.nomeFantasia = entity.nomeFantasia;
    this.responsavel = entity.responsavel;
    this.dataCadastro = entity.dataCadastro;
    this.dataAcessoDoc = entity.dataAcessoDoc;
    this.dataAcessoAuthHierarquia = entity.dataAcessoAuthHierarquia;
    this.dataAcessoWhitelist = entity.dataAcessoWhitelist;
    this.observacoes = entity.observacoes;
    this.ativo = entity.ativo;
  }

  static toDomain(dto: ConsumidorDTO) {
    return Consumidor.restore(
      dto.id,
      dto.cnpj,
      dto.razaoSocial,
      dto.nomeFantasia,
      dto.responsavel,
      dto.dataCadastro,
      dto.dataAcessoDoc,
      dto.dataAcessoAuthHierarquia,
      dto.dataAcessoWhitelist,
      dto.observacoes,
      dto.ativo,
    );
  }
}
