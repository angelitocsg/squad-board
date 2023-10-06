import { v4 as uuidv4 } from "uuid";

type TRepository =
  | "mfe-app"
  | "mfe-infra"
  | "bff-app"
  | "bff-infra"
  | "api-app"
  | "dep";

export default class Repository {
  private _repositoryId: string;
  get repositoryId() {
    return this._repositoryId;
  }
  private _projectId: string;
  get projectId() {
    return this._projectId;
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
    projectId: string,
    repository: string,
    type: TRepository,
    deploySequence: number = 1.0,
    siglaApp?: string
  ) {
    this._repositoryId = id;
    this._projectId = projectId;
    this._repository = repository;
    this._type = type;
    this._deploySequence = deploySequence;
    this._siglaApp = siglaApp;
  }

  static create(
    repository: string,
    projectId: string,
    type: TRepository,
    deploySequence: number = 1.0,
    siglaApp?: string
  ) {
    if (!repository) throw Error("O repositório deve ser informado");
    if (!projectId) throw Error("O projeto deve ser informado");
    if (!type) throw Error("O tipo deve ser informado");
    const id = uuidv4();
    return new Repository(
      id,
      repository,
      projectId,
      type,
      deploySequence,
      siglaApp
    );
  }

  static restore(
    id: string,
    projectId: string,
    repository: string,
    type: TRepository,
    deploySequence: number = 1.0,
    siglaApp?: string
  ) {
    return new Repository(
      id,
      repository,
      projectId,
      type,
      deploySequence,
      siglaApp
    );
  }
}
