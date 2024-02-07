import { v4 as uuidv4 } from "uuid";

export default class Acesso {
  private _id: string = "";
  get id() {
    return this._id;
  }
  readonly apiKey: string;
  readonly sigla: string;
  readonly escopos: string[];

  private constructor(
    id: string,
    apiKey: string,
    sigla: string,
    escopos: string[],
  ) {
    this._id = id;
    this.apiKey = apiKey;
    this.sigla = sigla;
    this.escopos = escopos;
  }

  updateId(id: string): this {
    if (!id) throw Error("Id is empty");
    this._id = id;
    return this;
  }

  static create(apiKey: string, sigla: string, escopos: string[]) {
    if (!apiKey) throw Error("O ApiKey deve ser informado");
    if (!sigla) throw Error("A sigla deve ser informada");
    const id = uuidv4();
    return new Acesso(id, apiKey, sigla, escopos);
  }

  static restore(id: string, apiKey: string, sigla: string, escopos: string[]) {
    return new Acesso(id, apiKey, sigla, escopos);
  }
}
