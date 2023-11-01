import Task from "../domain/Task";

export default class TaskDTO {
  id: string;
  description: string;
  parentId?: string;
  taskId?: string;
  type?: string;
  owner?: string;
  sprint?: string;
  status?: string;

  constructor(entity: Task) {
    this.id = entity.id;
    this.description = entity.description;
    this.parentId = entity.parentId;
    this.taskId = entity.taskId;
    this.type = entity.type;
    this.owner = entity.owner;
    this.sprint = entity.sprint;
    this.status = entity.status;
  }

  static toDomain(dto: TaskDTO) {
    return Task.restore(
      dto.id,
      dto.description,
      dto.parentId,
      dto.taskId,
      dto.type,
      dto.owner,
      dto.sprint,
      dto.status,
    );
  }
}
