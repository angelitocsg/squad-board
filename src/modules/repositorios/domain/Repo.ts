import { v4 as uuidv4 } from "uuid";

export enum RepositoryType {
  MFE_APP = "mfe-app",
  MFE_INFRA = "mfe-infra",
  BFF_APP = "bff-app",
  BFF_INFRA = "bff-infra",
  API_APP = "api-app",
  DEP = "dep",
}

export type TRepository =
  | "mfe-app"
  | "mfe-infra"
  | "bff-app"
  | "bff-infra"
  | "api-app"
  | "dep";

export default class Repo {
  private _id: string;
  get id() {
    return this._id;
  }
  private _productId: string;
  get productId() {
    return this._productId;
  }
  private _repository: string;
  get repository() {
    return this._repository;
  }
  private _type: TRepository;
  get type() {
    return this._type;
  }
  private _deploySequence: number;
  get deploySequence() {
    return this._deploySequence;
  }
  private _siglaApp?: string;
  get siglaApp() {
    return this._siglaApp;
  }

  private constructor(
    id: string,
    productId: string,
    repository: string,
    type: TRepository,
    deploySequence: number = 1.0,
    siglaApp?: string
  ) {
    this._id = id;
    this._productId = productId;
    this._repository = repository;
    this._type = type;
    this._deploySequence = deploySequence;
    this._siglaApp = siglaApp;
  }

  updateId(id: string): Repo {
    if (!id) throw Error("Id is empty");
    this._id = id;
    return this;
  }

  static create(
    productId: string,
    repository: string,
    type: TRepository,
    deploySequence: number = 1.0,
    siglaApp?: string
  ) {
    if (!repository) throw Error("O repositório deve ser informado");
    if (!productId) throw Error("O produto deve ser informado");
    if (!type) throw Error("O tipo deve ser informado");
    const id = uuidv4();
    return new Repo(id, repository, productId, type, deploySequence, siglaApp);
  }

  static restore(
    id: string,
    productId: string,
    repository: string,
    type: TRepository,
    deploySequence: number = 1.0,
    siglaApp?: string
  ) {
    return new Repo(id, repository, productId, type, deploySequence, siglaApp);
  }
}
