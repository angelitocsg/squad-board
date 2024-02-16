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
  readonly responsavel: string;
  private _acessoDocto: boolean = false;
  get acessoDocto() {
    return this._acessoDocto;
  }
  private _acessoViaHierarquia: boolean = false;
  get acessoViaHierarquia() {
    return this._acessoViaHierarquia;
  }
  private _ativo: boolean = false;
  get ativo() {
    return this._ativo;
  }

  constructor(
    id: string,
    cnpj: string,
    razaoSocial: string,
    nomeFantasia: string,
    dataCadastro: string,
    responsavel: string,
    acessoDocto?: boolean,
    acessoViaHierarquia?: boolean,
    ativo?: boolean,
  ) {
    this._id = id;
    this.cnpj = cnpj;
    this.razaoSocial = razaoSocial;
    this.nomeFantasia = nomeFantasia;
    this.dataCadastro = dataCadastro;
    this.responsavel = responsavel;
    this._acessoDocto = acessoDocto ?? false;
    this._acessoViaHierarquia = acessoViaHierarquia ?? false;
    this._ativo = ativo ?? false;
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
    responsavel: string,
    acessoDocto?: boolean,
    acessoViaHierarquia?: boolean,
    ativo?: boolean,
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
      responsavel,
      acessoDocto,
      acessoViaHierarquia,
      ativo,
    );
  }

  static restore(
    id: string,
    cnpj: string,
    razaoSocial: string,
    nomeFantasia: string,
    dataCadastro: string,
    responsavel: string,
    acessoDocto?: boolean,
    acessoViaHierarquia?: boolean,
    ativo?: boolean,
  ) {
    return new Consumidor(
      id,
      cnpj,
      razaoSocial,
      nomeFantasia,
      dataCadastro,
      responsavel,
      acessoDocto,
      acessoViaHierarquia,
      ativo,
    );
  }
}
