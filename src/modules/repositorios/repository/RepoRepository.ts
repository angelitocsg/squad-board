import { Observable } from "rxjs";

import Repo from "../domain/Repo";
import { TRepository } from "../types/RepositoryType";

export type TFilterRepo = {
  type?: TRepository;
  repository?: string;
  siglaApp?: string;
  productId?: string;
};

export default interface RepoRepository {
  data$: Observable<Repo[]>;
  getAll: (filter?: TFilterRepo) => Repo[];
  getById: (id: string) => Repo | undefined;
  create: (entity: Repo) => Repo;
  update: (id: string, entity: Repo) => Repo;
  delete: (id: string) => void;
}
