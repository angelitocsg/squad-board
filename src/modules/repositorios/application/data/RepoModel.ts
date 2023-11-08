import Repo from "../../domain/Repo";
import { RepositoryType, TRepository } from "../../types/RepositoryType";

export default class RepoModel {
  id: string = "";
  productId: string = "";
  product?: string = "";
  repository: string = "";
  type: TRepository = RepositoryType.DEP;
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
