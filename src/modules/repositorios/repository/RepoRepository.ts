import { Observable } from "rxjs";
import Repo, { TRepository } from "../domain/Repo";

export type TFilter = {
  type?: TRepository;
  repository?: string;
  siglaApp?: string;
};

export default interface RepoRepository {
  data$: Observable<Repo[]>;
  getAll: (filter?: TFilter) => Repo[];
  getById: (id: string) => Repo | undefined;
  create: (entity: Repo) => Repo;
  update: (id: string, entity: Repo) => Repo;
  delete: (id: string) => void;
}
