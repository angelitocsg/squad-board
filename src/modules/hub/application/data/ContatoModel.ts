import Contato from "../../domain/Contato";
import { v4 as uuidv4 } from "uuid";

export default class ContatoModel {
  id: string = "";
  nome: string = "";
  telefone: string = "";
  email: string = "";

  constructor() {
    this.id = uuidv4();
    this.nome = "";
    this.telefone = "";
    this.email = "";
  }

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
