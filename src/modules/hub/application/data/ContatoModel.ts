import Contato from "../../domain/Contato";

export default class ContatoModel {
  id: string = "";
  nome: string = "";
  telefone: string = "";
  email: string = "";

  static fromDomain(entity: Contato): ContatoModel {
    return {
      id: entity.id,
      nome: entity.nome,
      telefone: entity.telefone,
      email: entity.email,
    };
  }

  static toDomain(model: ContatoModel) {
    return Contato.restore(model.id, model.nome, model.telefone, model.email);
  }
}
