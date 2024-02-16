import Contato from "../domain/Contato";

export default class ContatoDTO {
  id: string;
  consumidorId: string;
  nome: string;
  telefone: string;
  email: string;

  constructor(entity: Contato) {
    this.id = entity.id;
    this.consumidorId = entity.consumidorId;
    this.nome = entity.nome;
    this.telefone = entity.telefone;
    this.email = entity.email;
  }

  static toDomain(dto: ContatoDTO) {
    return Contato.restore(
      dto.id,
      dto.consumidorId,
      dto.nome,
      dto.telefone,
      dto.email,
    );
  }
}
