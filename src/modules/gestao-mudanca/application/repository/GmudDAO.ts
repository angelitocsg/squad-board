import Gmud from "../../domain/entity/Gmud";

export type TFilter = {
  repositoryId?: string;
  dateFrom?: string;
  dateTo?: string;
};

export default interface GmudDAO {
  getAll: (filter?: TFilter) => Gmud[];
  getById: (id: string) => Gmud | undefined;
  getByNumber: (number: string) => Gmud | undefined;
  getByStory: (story: string) => Gmud | undefined;
  create: (entity: Gmud) => Gmud;
  update: (id: string, entity: Gmud) => Gmud;
  delete: (id: string) => void;
}
