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
  private _acessoDocto: boolean = false;
  get acessoDocto() {
    return this._acessoDocto;
  }
  private _acessoViaHierarquia: boolean = false;
  get acessoViaHierarquia() {
    return this._acessoViaHierarquia;
  }

  constructor(
    id: string,
    cnpj: string,
    razaoSocial: string,
    nomeFantasia: string,
    dataCadastro: string,
    contatos: Contato[],
    acessos: Acesso[],
    acessoDocto?: boolean,
    acessoViaHierarquia?: boolean,
  ) {
    this._id = id;
    this.cnpj = cnpj;
    this.razaoSocial = razaoSocial;
    this.nomeFantasia = nomeFantasia;
    this.dataCadastro = dataCadastro;
    this._contatos = contatos;
    this._acessos = acessos;
    this._acessoDocto = acessoDocto ?? false;
    this._acessoViaHierarquia = acessoViaHierarquia ?? false;
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
    acessoDocto?: boolean,
    acessoViaHierarquia?: boolean,
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
      acessoDocto,
      acessoViaHierarquia,
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
    acessoDocto?: boolean,
    acessoViaHierarquia?: boolean,
  ) {
    return new Consumidor(
      id,
      cnpj,
      razaoSocial,
      nomeFantasia,
      dataCadastro,
      contatos,
      acessos,
      acessoDocto,
      acessoViaHierarquia,
    );
  }
}
