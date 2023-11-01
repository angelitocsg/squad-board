import { v4 as uuidv4 } from "uuid";

import Task from "../../domain/Task";

export default class TaskModel {
  id: string = "";
  description?: string = "";
  parentId?: string = "";
  taskId?: string = "";
  type?: string = "";
  owner?: string = "";
  sprint?: string = "";
  status?: string = "";

  constructor() {
    this.id = uuidv4();
  }

  static fromDomain(entity: Task): TaskModel {
    return {
      id: entity.id,
      description: entity.description,
      parentId: entity.parentId,
      taskId: entity.taskId,
      type: entity.type,
      owner: entity.owner,
      sprint: entity.sprint,
      status: entity.status,
    };
  }

  static toDomain(model: TaskModel) {
    if (!model.description) return;
    return Task.restore(
      model.id,
      model.description,
      model.parentId,
      model.taskId,
      model.owner,
      model.sprint,
      model.status,
    );
  }
}
