import { StorageKey } from "../../../../enums/StorageKey";
import Gmud from "../../domain/entity/Gmud";
import GmudDAO, { TFilter } from "../../application/repository/GmudDAO";

export default class GmudDAOLocalStorage implements GmudDAO {
  data: Gmud[] = [];

  private load() {
    this.data = JSON.parse(localStorage.getItem(StorageKey.DATA_GMUD) ?? "[]");
  }

  private save() {
    localStorage.setItem(StorageKey.DATA_GMUD, JSON.stringify(this.data ?? []));
  }

  getAll(filter?: TFilter) {
    this.load();
    return this.data;
  }

  getById(id: string) {
    this.load();
    return this.data.find((gmud) => gmud.id === id);
  }

  getByNumber(number: string) {
    this.load();
    return this.data.find((gmud) => gmud.number === number);
  }

  getByStory(story: string) {
    this.load();
    return this.data.find((gmud) => gmud.story === story);
  }

  create(gmud: Gmud) {
    this.load();
    this.data.push(gmud);
    this.save();
    return gmud;
  }

  update(id: string, gmud: Gmud) {
    this.load();
    this.data = this.data.filter((g) => g.id !== id);
    this.data.push(gmud);
    this.save();
    return gmud;
  }

  delete(id: string) {
    this.load();
    this.data = this.data.filter((g) => g.id !== id);
    this.save();
  }
}
