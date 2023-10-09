import { v4 as uuidv4 } from "uuid";

export default class Product {
  private _id: string;
  get id() {
    return this._id;
  }
  private _sigla: string;
  get sigla() {
    return this._sigla;
  }
  private _squad: string;
  get squad() {
    return this._squad;
  }
  private _name: string;
  get name() {
    return this._name;
  }
  private _description?: string;
  get description() {
    return this._description;
  }
  private _disabled: boolean;
  get disabled() {
    return this._disabled;
  }

  private constructor(
    id: string,
    sigla: string,
    squad: string,
    name: string,
    description?: string,
    disabled?: boolean,
  ) {
    this._id = id;
    this._sigla = sigla;
    this._squad = squad;
    this._name = name;
    this._description = description;
    this._disabled = disabled ?? false;
  }

  updateId(id: string): Product {
    if (!id) throw Error("Id is empty");
    this._id = id;
    return this;
  }

  static create(
    sigla: string,
    squad: string,
    name: string,
    description?: string,
    disabled?: boolean,
  ) {
    if (!sigla) throw Error("A sigla deve ser informada");
    if (!squad) throw Error("A squad deve ser informada");
    if (!name) throw Error("O nome do produto deve ser informado");
    const id = uuidv4();
    return new Product(id, sigla, squad, name, description, disabled);
  }

  static restore(
    id: string,
    sigla: string,
    squad: string,
    name: string,
    description?: string,
    disabled?: boolean,
  ) {
    return new Product(id, sigla, squad, name, description, disabled);
  }
}
