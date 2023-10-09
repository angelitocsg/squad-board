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
  private _externalId?: string = "";
  get externalId() {
    return this._externalId;
  }
  private _title: string = "";
  get title() {
    return this._title;
  }
  private _description?: string = "";
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

  private constructor(
    id: string,
    title: string,
    description?: string,
    externalId?: string,
    owner?: string,
    sprint?: string,
    parentId?: string,
  ) {
    this._id = id;
    this._title = title;
    this._externalId = externalId;
    this._description = description;
    this._owner = owner;
    this._sprint = sprint;
    this._parentId = parentId;
  }

  updateId(id: string): Task {
    if (!id) throw Error("Id is empty");
    this._id = id;
    return this;
  }

  static create(
    title: string,
    description?: string,
    externalId?: string,
    owner?: string,
    sprint?: string,
    parentId?: string,
  ) {
    if (!title) throw Error("O título deve ser informado");
    const id = uuidv4();
    return new Task(
      id,
      title,
      description,
      externalId,
      owner,
      sprint,
      parentId,
    );
  }

  static restore(
    id: string,
    title: string,
    description?: string,
    externalId?: string,
    owner?: string,
    sprint?: string,
    parentId?: string,
  ) {
    return new Task(
      id,
      title,
      description,
      externalId,
      owner,
      sprint,
      parentId,
    );
  }
}
