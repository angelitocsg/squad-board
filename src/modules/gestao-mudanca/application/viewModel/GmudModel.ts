import Gmud from "../../domain/entity/Gmud";

export default class GmudModel {
  id: string = "";
  repositoryId: string = "";
  story: string = "";
  number: string = "";
  version: string = "";
  date: string = "";
  time: string = "";
  link: string = "";
  status: string = "";
  owner: string = "";
  description: string = "";

  constructor(repositoryId: string = "") {
    this.repositoryId = repositoryId;
  }

  static fromDomain(entity: Gmud): GmudModel {
    return {
      id: entity.id,
      repositoryId: entity.repositoryId,
      story: entity.story,
      number: entity.number,
      version: entity.version,
      date: entity.date,
      time: entity.time,
      link: entity.link,
      status: entity.status,
      owner: entity.owner,
      description: entity.description,
    };
  }

  static toDomain(model: GmudModel) {
    return Gmud.restore(
      model.id,
      model.story,
      model.repositoryId,
      model.version,
      model.number,
      model.status,
      model.date,
      model.time,
      model.link,
      model.owner,
      model.description
    );
  }
}
