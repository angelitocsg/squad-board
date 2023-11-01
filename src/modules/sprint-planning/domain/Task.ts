import { v4 as uuidv4 } from "uuid";

export default class Task {
  private _id: string = "";
  get id() {
    return this._id;
  }
  private _parentId?: string = "";
  get parentId() {
    return this._parentId;
  }
  private _taskId?: string = "";
  get taskId() {
    return this._taskId;
  }
  private _type?: string = "";
  get type() {
    return this._type;
  }
  private _description: string = "";
  get description() {
    return this._description;
  }
  private _owner?: string = "";
  get owner() {
    return this._owner;
  }
  private _sprint?: string = "";
  get sprint() {
    return this._sprint;
  }
  private _status?: string = "";
  get status() {
    return this._status;
  }

  private constructor(
    id: string,
    description: string,
    parentId?: string,
    taskId?: string,
    type?: string,
    owner?: string,
    sprint?: string,
    status?: string,
  ) {
    this._id = id;
    this._description = description;
    this._parentId = parentId;
    this._taskId = taskId;
    this._type = type;
    this._owner = owner;
    this._sprint = sprint;
    this._status = status;
  }

  updateId(id: string): Task {
    if (!id) throw Error("Id is empty");
    this._id = id;
    return this;
  }

  static create(
    description: string,
    parentId?: string,
    taskId?: string,
    type?: string,
    owner?: string,
    sprint?: string,
    status?: string,
  ) {
    if (!description) throw Error("A descrição deve ser informada");
    const id = uuidv4();
    return new Task(id, description, parentId, taskId, type, owner, sprint, status);
  }

  static restore(
    id: string,
    description: string,
    parentId?: string,
    taskId?: string,
    type?: string,
    owner?: string,
    sprint?: string,
    status?: string,
  ) {
    return new Task(id, description, parentId, taskId, type, owner, sprint, status);
  }
}
