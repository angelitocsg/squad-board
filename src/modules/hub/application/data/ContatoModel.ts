import Contato from "../../domain/Contato";
import { v4 as uuidv4 } from "uuid";

export default class ContatoModel {
  id: string = "";
  consumidorId: string = "";
  nome: string = "";
  telefone: string = "";
  email: string = "";

  constructor() {
    this.id = uuidv4();
    this.consumidorId = "";
    this.nome = "";
    this.telefone = "";
    this.email = "";
  }

  static fromDomain(entity: Contato): ContatoModel {
    return {
      id: entity.id,
      consumidorId: entity.consumidorId,
      nome: entity.nome,
      telefone: entity.telefone,
      email: entity.email,
    };
  }

  static toDomain(model: ContatoModel) {
    return Contato.restore(
      model.id,
      model.consumidorId,
      model.nome,
      model.telefone,
      model.email,
    );
  }
}
