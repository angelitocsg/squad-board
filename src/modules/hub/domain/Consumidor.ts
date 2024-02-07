import Acesso from "./Acesso";
import Contato from "./Contato";
import { v4 as uuidv4 } from "uuid";

export default class Consumidor {
  private _id: string = "";
  get id() {
    return this._id;
  }
  readonly cnpj: string;
  readonly razaoSocial: string;
  readonly nomeFantasia: string;
  readonly dataCadastro: string;
  private _contatos: Contato[];
  get contatos() {
    return this._contatos;
  }
  private _acessos: Acesso[];
  get acessos() {
    return this._acessos;
  }

  constructor(
    id: string,
    cnpj: string,
    razaoSocial: string,
    nomeFantasia: string,
    dataCadastro: string,
    contatos: Contato[],
    acessos: Acesso[],
  ) {
    this._id = id;
    this.cnpj = cnpj;
    this.razaoSocial = razaoSocial;
    this.nomeFantasia = nomeFantasia;
    this.dataCadastro = dataCadastro;
    this._contatos = contatos;
    this._acessos = acessos;
  }

  updateId(id: string): this {
    if (!id) throw Error("Id is empty");
    this._id = id;
    return this;
  }

  static create(
    cnpj: string,
    razaoSocial: string,
    nomeFantasia: string,
    dataCadastro: string,
    contatos: Contato[],
    acessos: Acesso[],
  ) {
    if (!cnpj) throw Error("O CNPJ deve ser informado");
    if (!razaoSocial) throw Error("A razão social deve ser informada");
    const id = uuidv4();
    return new Consumidor(
      id,
      cnpj,
      razaoSocial,
      nomeFantasia,
      dataCadastro,
      contatos,
      acessos,
    );
  }

  static restore(
    id: string,
    cnpj: string,
    razaoSocial: string,
    nomeFantasia: string,
    dataCadastro: string,
    contatos: Contato[],
    acessos: Acesso[],
  ) {
    return new Consumidor(
      id,
      cnpj,
      razaoSocial,
      nomeFantasia,
      dataCadastro,
      contatos,
      acessos,
    );
  }
}
