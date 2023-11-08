import Repo from "../domain/Repo";
import { TRepository } from "../types/RepositoryType";

export default class RepoDTO {
  id!: string;
  productId!: string;
  repository!: string;
  type!: TRepository;
  deploySequence!: number;
  siglaApp?: string;

  constructor(repo: Repo) {
    this.id = repo.id;
    this.productId = repo.productId;
    this.repository = repo.repository;
    this.type = repo.type;
    this.deploySequence = repo.deploySequence;
    this.siglaApp = repo.siglaApp;
  }

  static toDomain(dto: RepoDTO) {
    return Repo.restore(
      dto.id,
      dto.productId,
      dto.repository,
      dto.type,
      dto.deploySequence,
      dto.siglaApp,
    );
  }

  static fromDomain(entity: Repo) {
    return new RepoDTO(entity);
  }
}
