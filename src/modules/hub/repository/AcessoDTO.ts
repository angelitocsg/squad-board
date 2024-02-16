import Acesso from "../domain/Acesso";

export default class AcessoDTO {
  id: string;
  consumidorId: string;
  apiKey: string;
  sigla: string;
  escopos: string;
  dataCadastro: string;
  ativo: boolean;

  constructor(entity: Acesso) {
    this.id = entity.id;
    this.consumidorId = entity.consumidorId;
    this.apiKey = entity.apiKey;
    this.sigla = entity.sigla;
    this.escopos = entity.escopos;
    this.dataCadastro = entity.dataCadastro;
    this.ativo = entity.ativo;
  }

  static toDomain(dto: AcessoDTO) {
    return Acesso.restore(
      dto.id,
      dto.consumidorId,
      dto.apiKey,
      dto.sigla,
      dto.escopos,
      dto.dataCadastro,
      dto.ativo,
    );
  }
}
