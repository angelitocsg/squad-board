import Repo from "../../domain/Repo";
import { TCodeBase } from "../../types/CodeBaseType";
import { EnvStatusType, TEnvStatus } from "../../types/EnvStatusType";
import { TLongText } from "../../types/LongText";
import { RepositoryType, TRepository } from "../../types/RepositoryType";

export default class RepoModel {
  id: string = "";
  productId: string = "";
  product?: string = "";
  repository: string = "";
  type: TRepository = RepositoryType.DEP;
  deploySequence: string = "0.0";
  siglaApp?: string = "";
  description?: string = "";
  codeBase?: TCodeBase;
  pipelineVersion?: string = "";
  gatewayAuthorizer?: string = "";
  gatewayIdDev?: string = "";
  gatewayIdHom?: string = "";
  gatewayIdPrd?: string = "";
  devStatus?: TEnvStatus = EnvStatusType.DEFAULT;
  homStatus?: TEnvStatus = EnvStatusType.DEFAULT;
  prodStatus?: TEnvStatus = EnvStatusType.DEFAULT;
  notes?: TLongText = "";

  static toDomain(model: RepoModel): Repo {
    const repo = Repo.create(
      model.productId,
      model.repository,
      model.type,
      model.deploySequence,
      model.siglaApp,
      model.description,
      model.codeBase,
      model.pipelineVersion,
      model.gatewayAuthorizer,
      model.gatewayIdDev,
      model.gatewayIdHom,
      model.gatewayIdPrd,
      model.devStatus,
      model.homStatus,
      model.prodStatus,
      model.notes,
    );
    return repo;
  }

  static fromDomain(entity: Repo): RepoModel {
    return {
      id: entity.id,
      productId: entity.productId,
      repository: entity.repository,
      type: entity.type,
      deploySequence: entity.deploySequence,
      siglaApp: entity.siglaApp,
      description: entity.description,
      codeBase: entity.codeBase,
      pipelineVersion: entity.pipelineVersion,
      gatewayAuthorizer: entity.gatewayAuthorizer,
      gatewayIdDev: entity.gatewayIdDev,
      gatewayIdHom: entity.gatewayIdHom,
      gatewayIdPrd: entity.gatewayIdPrd,
      devStatus: entity.devStatus,
      homStatus: entity.homStatus,
      prodStatus: entity.prodStatus,
      notes: entity.notes,
    };
  }
}
