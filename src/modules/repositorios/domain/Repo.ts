import { v4 as uuidv4 } from "uuid";

import { CodeBaseType, TCodeBase } from "../types/CodeBaseType";
import { EnvStatusType, TEnvStatus } from "../types/EnvStatusType";
import { TLongText } from "../types/LongText";
import { TRepository } from "../types/RepositoryType";

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
  private _description?: string;
  get description() {
    return this._description;
  }
  private _codeBase?: TCodeBase;
  get codeBase() {
    return this._codeBase;
  }
  private _pipelineVersion?: string;
  get pipelineVersion() {
    return this._pipelineVersion;
  }
  private _gatewayAuthorizer?: string;
  get gatewayAuthorizer() {
    return this._gatewayAuthorizer;
  }
  private _gatewayIdDev?: string;
  get gatewayIdDev() {
    return this._gatewayIdDev;
  }
  private _gatewayIdHom?: string;
  get gatewayIdHom() {
    return this._gatewayIdHom;
  }
  private _gatewayIdPrd?: string;
  get gatewayIdPrd() {
    return this._gatewayIdPrd;
  }
  private _devStatus?: TEnvStatus;
  get devStatus() {
    return this._devStatus;
  }
  private _homStatus?: TEnvStatus;
  get homStatus() {
    return this._homStatus;
  }
  private _prodStatus?: TEnvStatus;
  get prodStatus() {
    return this._prodStatus;
  }
  private _notes?: TLongText;
  get notes() {
    return this._notes;
  }

  private constructor(
    id: string,
    productId: string,
    repository: string,
    type: TRepository,
    deploySequence: number = 1.0,
    siglaApp?: string,
    description?: string,
    codeBase?: TCodeBase,
    pipelineVersion?: string,
    gatewayAuthorizer?: string,
    gatewayIdDev?: string,
    gatewayIdHom?: string,
    gatewayIdPrd?: string,
    devStatus?: TEnvStatus,
    homStatus?: TEnvStatus,
    prodStatus?: TEnvStatus,
    notes?: TLongText,
  ) {
    this._id = id;
    this._productId = productId;
    this._repository = repository;
    this._type = type;
    this._deploySequence = deploySequence;
    this._siglaApp = siglaApp ?? "";
    this._description = description ?? "";
    this._codeBase = codeBase ?? CodeBaseType.NONE;
    this._pipelineVersion = pipelineVersion ?? "";
    this._gatewayAuthorizer = gatewayAuthorizer ?? "";
    this._gatewayIdDev = gatewayIdDev ?? "";
    this._gatewayIdHom = gatewayIdHom ?? "";
    this._gatewayIdPrd = gatewayIdPrd ?? "";
    this._devStatus = devStatus ?? EnvStatusType.DEFAULT;
    this._homStatus = homStatus ?? EnvStatusType.DEFAULT;
    this._prodStatus = prodStatus ?? EnvStatusType.DEFAULT;
    this._notes = notes ?? "";
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
    siglaApp?: string,
    description?: string,
    codeBase?: TCodeBase,
    pipelineVersion?: string,
    gatewayAuthorizer?: string,
    gatewayIdDev?: string,
    gatewayIdHom?: string,
    gatewayIdPrd?: string,
    devStatus?: TEnvStatus,
    homStatus?: TEnvStatus,
    prodStatus?: TEnvStatus,
    notes?: TLongText,
  ) {
    if (!productId) throw Error("O produto deve ser informado");
    if (!repository) throw Error("O repositório deve ser informado");
    if (!type) throw Error("O tipo deve ser informado");
    if (!codeBase) throw Error("O code base deve ser informado");
    if (!pipelineVersion)
      throw Error("A versão da pipeline deve ser informada");
    const id = uuidv4();
    return new Repo(
      id,
      productId,
      repository,
      type,
      deploySequence,
      siglaApp,
      description,
      codeBase,
      pipelineVersion,
      gatewayAuthorizer,
      gatewayIdDev,
      gatewayIdHom,
      gatewayIdPrd,
      devStatus,
      homStatus,
      prodStatus,
      notes,
    );
  }

  static restore(
    id: string,
    productId: string,
    repository: string,
    type: TRepository,
    deploySequence: number = 1.0,
    siglaApp?: string,
    description?: string,
    codeBase?: TCodeBase,
    pipelineVersion?: string,
    gatewayAuthorizer?: string,
    gatewayIdDev?: string,
    gatewayIdHom?: string,
    gatewayIdPrd?: string,
    devStatus?: TEnvStatus,
    homStatus?: TEnvStatus,
    prodStatus?: TEnvStatus,
    notes?: TLongText,
  ) {
    return new Repo(
      id,
      productId,
      repository,
      type,
      deploySequence,
      siglaApp,
      description,
      codeBase,
      pipelineVersion,
      gatewayAuthorizer,
      gatewayIdDev,
      gatewayIdHom,
      gatewayIdPrd,
      devStatus,
      homStatus,
      prodStatus,
      notes,
    );
  }
}
