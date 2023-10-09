import Task from "../../domain/Task";

export default class TaskModel {
  id: string = "";
  title: string = "";
  description?: string = "";
  externalId?: string = "";
  owner?: string = "";
  sprint?: string = "";
  parentId?: string = "";

  static fromDomain(entity: Task): TaskModel {
    return {
      id: entity.id,
      title: entity.title,
      description: entity.description,
      externalId: entity.externalId,
      owner: entity.owner,
      sprint: entity.sprint,
      parentId: entity.parentId,
    };
  }

  static toDomain(model: TaskModel) {
    return Task.restore(
      model.id,
      model.title,
      model.description,
      model.externalId,
      model.owner,
      model.sprint,
      model.parentId,
    );
  }
}
