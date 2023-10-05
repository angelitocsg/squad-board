import Gmud from "../../domain/entity/Gmud";

export default class GmudDTO {
  id!: string;
  story!: string;
  repositoryId!: string;
  number!: string;
  version!: string;
  status!: string;
  date!: string;
  time!: string;
  link!: string;
  owner!: string;
  description!: string;

  constructor(id: string, gmud: Gmud) {
    this.id = id;
    this.story = gmud.story;
    this.repositoryId = gmud.repositoryId;
    this.number = gmud.number;
    this.version = gmud.version;
    this.status = gmud.status;
    this.date = gmud.date;
    this.time = gmud.time;
    this.link = gmud.link;
    this.owner = gmud.owner;
    this.description = gmud.description;
  }

  static toDomain(dto: GmudDTO) {
    return Gmud.restore(
      dto.id,
      dto.story,
      dto.repositoryId,
      dto.version,
      dto.number,
      dto.status,
      dto.date,
      dto.time,
      dto.link,
      dto.owner,
      dto.description
    );
  }
}
