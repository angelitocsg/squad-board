import { CANCELLED } from "dns";
import { GmudStatus } from "../../../../enums/GmudStatus";
import { TGmudStatus } from "../../../../types/TGmudStatus";
import { v4 as uuidv4 } from "uuid";

export default class Gmud {
  private _id: string = "";
  get id() {
    return this._id;
  }
  readonly story: string;
  readonly repositoryId: string;
  private _number: string = "";
  get number() {
    return this._number;
  }
  private _version: string;
  get version() {
    return this._version;
  }
  private _status: TGmudStatus;
  get status() {
    return this._status;
  }
  private _date: string = "";
  get date() {
    return this._date;
  }
  private _time: string = "";
  get time() {
    return this._time;
  }
  private _link: string = "";
  get link() {
    return this._link;
  }
  private _owner: string = "";
  get owner() {
    return this._owner;
  }
  private _description: string = "";
  get description() {
    return this._description;
  }

  private constructor(
    id: string,
    story: string,
    repositoryId: string,
    version: string,
    owner?: string,
    description?: string
  ) {
    this._id = id;
    this.story = story;
    this.repositoryId = repositoryId;
    this._version = version;
    this._status = GmudStatus.INDEFINIDA;
    this._owner = owner ?? "";
    this._description = description ?? "";
  }

  updateId(id: string): Gmud {
    if (!id) throw Error("Id is empty");
    this._id = id;
    return this;
  }

  static create(
    story: string,
    repositoryId: string,
    version: string,
    owner?: string,
    description?: string
  ) {
    const id = uuidv4();
    if (!repositoryId) throw Error("O repositório deve ser informado");
    if (!story) throw Error("A história deve ser informada");
    return new Gmud(id, story, repositoryId, version, owner, description);
  }

  static restore(
    id: string,
    story: string,
    repositoryId: string,
    version: string,
    number: string,
    status: string,
    date: string,
    time: string,
    link: string,
    owner: string,
    description: string
  ) {
    const gmud = new Gmud(id, story, repositoryId, version);
    gmud._number = number;
    gmud._status = status as TGmudStatus;
    gmud._date = date;
    gmud._time = time;
    gmud._link = link ?? "";
    gmud._owner = owner;
    gmud._description = description;
    return gmud;
  }

  register(
    number: string,
    link: string,
    version?: string,
    owner?: string,
    description?: string
  ) {
    this._number = number;
    this._link = link ?? "";
    this._version = version ?? this._version;
    this._status = GmudStatus.PENDENTE;
    this._owner = owner ?? "";
    this._description = description ?? "";
  }

  schedule(
    date: string,
    time: string,
    version?: string,
    owner?: string,
    description?: string
  ) {
    this._date = date;
    this._time = time;
    this._status = GmudStatus.AGENDADA;
    this._version = version ?? this._version;
    this._owner = owner ?? this._owner;
    this._description = description ?? this._description;
  }

  cancel(): Gmud {
    if (
      this._status === GmudStatus.CANCELADA ||
      this._status === GmudStatus.PUBLICADA
    )
      throw new Error("A GMUD já está CANCELADA ou PUBLICADA");
    this._status = GmudStatus.CANCELADA;
    return this;
  }

  publish(): Gmud {
    if (this._status !== GmudStatus.AGENDADA)
      throw new Error(
        "Para ser publicada a GMUD deve estar no status AGENDADA"
      );
    this._status = GmudStatus.PUBLICADA;
    return this;
  }
}
