import Repo, { TRepository } from "../../domain/Repo";

export default class RepoModel {
  id: string = "";
  productId: string = "";
  repository: string = "";
  type: TRepository = "dep";
  deploySequence: number = 1.0;
  siglaApp?: string = "";

  static fromDomain(entity: Repo): RepoModel {
    return {
      id: entity.id,
      productId: entity.productId,
      repository: entity.repository,
      type: entity.type,
      deploySequence: entity.deploySequence,
      siglaApp: entity.siglaApp,
    };
  }
}
