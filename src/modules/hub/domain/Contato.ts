import { v4 as uuidv4 } from "uuid";

export default class Contato {
  private _id: string = "";
  get id() {
    return this._id;
  }
  readonly nome: string;
  readonly telefone: string;
  readonly email: string;

  private constructor(
    id: string,
    nome: string,
    telefone: string,
    email: string,
  ) {
    this._id = id;
    this.nome = nome;
    this.telefone = telefone;
    this.email = email;
  }

  updateId(id: string): this {
    if (!id) throw Error("Id is empty");
    this._id = id;
    return this;
  }

  static create(nome: string, telefone: string, email: string) {
    if (!nome) throw Error("O nome deve ser informado");
    if (!email) throw Error("O e-mail deve ser informado");
    const id = uuidv4();
    return new Contato(id, nome, telefone, email);
  }

  static restore(id: string, nome: string, telefone: string, email: string) {
    if (!nome) throw Error("O nome deve ser informado");
    if (!email) throw Error("O e-mail deve ser informado");
    return new Contato(id, nome, telefone, email);
  }
}
