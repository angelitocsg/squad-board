import { v4 as uuidv4 } from "uuid";

export default class Acesso {
  private _id: string = "";
  get id() {
    return this._id;
  }
  readonly consumidorId: string;
  readonly apiKey: string;
  readonly sigla: string;
  readonly escopos: string;
  readonly dataCadastro: string;
  readonly ativo: boolean;

  private constructor(
    id: string,
    consumidorId: string,
    apiKey: string,
    sigla: string,
    escopos: string,
    dataCadastro: string,
    ativo: boolean,
  ) {
    this._id = id;
    this.consumidorId = consumidorId;
    this.apiKey = apiKey;
    this.sigla = sigla;
    this.escopos = escopos;
    this.dataCadastro = dataCadastro;
    this.ativo = ativo;
  }

  updateId(id: string): this {
    if (!id) throw Error("Id is empty");
    this._id = id;
    return this;
  }

  static create(
    consumidorId: string,
    apiKey: string,
    sigla: string,
    escopos: string,
    dataCadastro: string,
    ativo: boolean = false,
  ) {
    if (!consumidorId) throw Error("O correspondente deve ser informado");
    if (!apiKey) throw Error("O ApiKey deve ser informado");
    if (!sigla) throw Error("A sigla deve ser informada");
    const id = uuidv4();
    return new Acesso(
      id,
      consumidorId,
      apiKey,
      sigla,
      escopos,
      dataCadastro,
      ativo,
    );
  }

  static restore(
    id: string,
    consumidorId: string,
    apiKey: string,
    sigla: string,
    escopos: string,
    dataCadastro: string,
    ativo: boolean = false,
  ) {
    if (!consumidorId) throw Error("O correspondente deve ser informado");
    if (!apiKey) throw Error("O ApiKey deve ser informado");
    if (!sigla) throw Error("A sigla deve ser informada");
    return new Acesso(
      id,
      consumidorId,
      apiKey,
      sigla,
      escopos,
      dataCadastro,
      ativo,
    );
  }
}
