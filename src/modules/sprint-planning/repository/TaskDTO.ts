import Task from "../domain/Task";

export default class TaskDTO {
  id: string;
  title: string;
  description?: string;
  externalId?: string;
  owner?: string;
  sprint?: string;
  parentId?: string;

  constructor(entity: Task) {
    this.id = entity.id;
    this.title = entity.title;
    this.description = entity.description;
    this.externalId = entity.externalId;
    this.owner = entity.owner;
    this.sprint = entity.sprint;
    this.parentId = entity.parentId;
  }

  static toDomain(dto: TaskDTO) {
    return Task.restore(
      dto.id,
      dto.title,
      dto.description,
      dto.externalId,
      dto.owner,
      dto.sprint,
      dto.parentId,
    );
  }
}
