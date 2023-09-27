import { GmudStatus } from "../../../../enums/GmudStatus";
import { TGmudStatus } from "../../../../types/TGmudStatus";
import Gmud from "../../domain/entity/Gmud";

export default class GmudModel {
  repositoryId: string = "";
  story: string = "";
  number: string = "";
  version: string = "";
  date: string = "";
  time: string = "";
  link: string = "";
  status: TGmudStatus = GmudStatus.INDEFINIDA;

  constructor(repositoryId: string = "") {
    this.repositoryId = repositoryId;
  }

  static fromGmud(entity: Gmud): GmudModel {
    return {
      repositoryId: entity.repositoryId,
      story: entity.story,
      number: entity.number,
      version: entity.version,
      date: entity.date,
      time: entity.time,
      link: entity.link,
      status: entity.status,
    };
  }
}
