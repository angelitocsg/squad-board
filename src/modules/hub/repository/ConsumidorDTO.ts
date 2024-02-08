import Acesso from "../domain/Acesso";
import Consumidor from "../domain/Consumidor";
import Contato from "../domain/Contato";

export default class ConsumidorDTO {
  id: string;
  cnpj: string;
  razaoSocial: string;
  nomeFantasia: string;
  dataCadastro: string;
  contatos: object[];
  acessos: object[];
  acessoDocto: boolean;
  acessoViaHierarquia: boolean;

  constructor(entity: Consumidor) {
    this.id = entity.id;
    this.cnpj = entity.cnpj;
    this.razaoSocial = entity.razaoSocial;
    this.nomeFantasia = entity.nomeFantasia;
    this.dataCadastro = entity.dataCadastro;
    this.contatos = entity.contatos;
    this.acessos = entity.acessos;
    this.acessoDocto = entity.acessoDocto;
    this.acessoViaHierarquia = entity.acessoViaHierarquia;
  }

  static toDomain(dto: ConsumidorDTO) {
    return Consumidor.restore(
      dto.id,
      dto.cnpj,
      dto.razaoSocial,
      dto.nomeFantasia,
      dto.dataCadastro,
      dto.contatos as Contato[],
      dto.acessos as Acesso[],
      dto.acessoDocto,
      dto.acessoViaHierarquia,
    );
  }
}
