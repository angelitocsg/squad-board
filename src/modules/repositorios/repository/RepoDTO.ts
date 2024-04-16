import Repo from "../domain/Repo";
import { TCodeBase } from "../types/CodeBaseType";
import { TEnvStatus } from "../types/EnvStatusType";
import { TLongText } from "../types/LongText";
import { TRepository } from "../types/RepositoryType";

export default class RepoDTO {
  id!: string;
  productId!: string;
  repository!: string;
  type!: TRepository;
  deploySequence!: number;
  siglaApp?: string;
  description?: string;
  codeBase?: TCodeBase;
  pipelineVersion?: string;
  gatewayAuthorizer?: string;
  gatewayIdDev?: string;
  gatewayIdHom?: string;
  gatewayIdPrd?: string;
  devStatus?: TEnvStatus;
  homStatus?: TEnvStatus;
  prodStatus?: TEnvStatus;
  notes?: TLongText;

  constructor(repo: Repo) {
    this.id = repo.id;
    this.productId = repo.productId;
    this.repository = repo.repository;
    this.type = repo.type;
    this.deploySequence = repo.deploySequence;
    this.siglaApp = repo.siglaApp;
    this.description = repo.description;
    this.codeBase = repo.codeBase;
    this.pipelineVersion = repo.pipelineVersion;
    this.gatewayAuthorizer = repo.gatewayAuthorizer;
    this.gatewayIdDev = repo.gatewayIdDev;
    this.gatewayIdHom = repo.gatewayIdHom;
    this.gatewayIdPrd = repo.gatewayIdPrd;
    this.devStatus = repo.devStatus;
    this.homStatus = repo.homStatus;
    this.prodStatus = repo.prodStatus;
    this.notes = repo.notes;
  }

  static toDomain(dto: RepoDTO) {
    return Repo.restore(
      dto.id,
      dto.productId,
      dto.repository,
      dto.type,
      dto.deploySequence,
      dto.siglaApp,
      dto.description,
      dto.codeBase,
      dto.pipelineVersion,
      dto.gatewayAuthorizer,
      dto.gatewayIdDev,
      dto.gatewayIdHom,
      dto.gatewayIdPrd,
      dto.devStatus,
      dto.homStatus,
      dto.prodStatus,
      dto.notes,
    );
  }

  static fromDomain(entity: Repo) {
    return new RepoDTO(entity);
  }
}
