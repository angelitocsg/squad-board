import { v4 as uuidv4 } from "uuid";

export default class Contato {
  private _id: string = "";
  get id() {
    return this._id;
  }
  readonly consumidorId: string;
  readonly nome: string;
  readonly telefone: string;
  readonly email: string;

  private constructor(
    id: string,
    consumidorId: string,
    nome: string,
    telefone: string,
    email: string,
  ) {
    this._id = id;
    this.consumidorId = consumidorId;
    this.nome = nome;
    this.telefone = telefone;
    this.email = email;
  }

  updateId(id: string): this {
    if (!id) throw Error("Id is empty");
    this._id = id;
    return this;
  }

  static create(
    consumidorId: string,
    nome: string,
    telefone: string,
    email: string,
  ) {
    if (!consumidorId) throw Error("O correspondente deve ser informado");
    if (!nome) throw Error("O nome deve ser informado");
    if (!email) throw Error("O e-mail deve ser informado");
    const id = uuidv4();
    return new Contato(id, consumidorId, nome, telefone, email);
  }

  static restore(
    id: string,
    consumidorId: string,
    nome: string,
    telefone: string,
    email: string,
  ) {
    if (!consumidorId) throw Error("O correspondente deve ser informado");
    if (!nome) throw Error("O nome deve ser informado");
    if (!email) throw Error("O e-mail deve ser informado");
    return new Contato(id, consumidorId, nome, telefone, email);
  }
}
