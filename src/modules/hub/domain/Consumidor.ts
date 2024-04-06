import { v4 as uuidv4 } from "uuid";

export default class Consumidor {
  private _id: string = "";
  get id() {
    return this._id;
  }
  readonly cnpj: string;
  readonly razaoSocial: string;
  readonly nomeFantasia: string;
  readonly responsavel: string;
  readonly dataCadastro: string;
  readonly dataAcessoDoc: string;
  readonly dataAcessoAuthHierarquia: string;
  readonly dataAcessoWhitelist: string;
  readonly observacoes: string;
  private _ativo: boolean = false;
  get ativo() {
    return this._ativo;
  }

  constructor(
    id: string,
    cnpj: string,
    razaoSocial: string,
    nomeFantasia: string,
    responsavel: string,
    dataCadastro: string,
    dataAcessoDoc: string,
    dataAcessoAuthHierarquia: string,
    dataAcessoWhitelist: string,
    observacoes: string,
    ativo?: boolean,
  ) {
    this._id = id;
    this.cnpj = cnpj;
    this.razaoSocial = razaoSocial;
    this.nomeFantasia = nomeFantasia;
    this.responsavel = responsavel;
    this.dataCadastro = dataCadastro;
    this.dataAcessoDoc = dataAcessoDoc;
    this.dataAcessoAuthHierarquia = dataAcessoAuthHierarquia;
    this.dataAcessoWhitelist = dataAcessoWhitelist;
    this.observacoes = observacoes;
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
    responsavel: string,
    dataCadastro: string,
    dataAcessoDoc: string,
    dataAcessoAuthHierarquia: string,
    dataAcessoWhitelist: string,
    observacoes: string,
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
      responsavel,
      dataCadastro,
      dataAcessoDoc,
      dataAcessoAuthHierarquia,
      dataAcessoWhitelist,
      observacoes,
      ativo,
    );
  }

  static restore(
    id: string,
    cnpj: string,
    razaoSocial: string,
    nomeFantasia: string,
    responsavel: string,
    dataCadastro: string,
    dataAcessoDoc: string,
    dataAcessoAuthHierarquia: string,
    dataAcessoWhitelist: string,
    observacoes: string,
    ativo?: boolean,
  ) {
    return new Consumidor(
      id,
      cnpj,
      razaoSocial,
      nomeFantasia,
      responsavel,
      dataCadastro,
      dataAcessoDoc,
      dataAcessoAuthHierarquia,
      dataAcessoWhitelist,
      observacoes,
      ativo,
    );
  }
}
