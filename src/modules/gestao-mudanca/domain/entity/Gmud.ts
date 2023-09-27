import { GmudStatus } from "../../../../enums/GmudStatus";
import { TGmudStatus } from "../../../../types/TGmudStatus";
import { v4 as uuidv4 } from "uuid";

export default class Gmud {
  readonly id: string = "";
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

  private constructor(
    id: string,
    story: string,
    repositoryId: string,
    version: string
  ) {
    this.id = id;
    this.story = story;
    this.repositoryId = repositoryId;
    this._version = version;
    this._status = GmudStatus.INDEFINIDA;
  }

  static create(story: string, repositoryId: string, version: string) {
    const id = uuidv4();
    if (!story) throw Error("Story is empty");
    if (!repositoryId) throw Error("Repository is empty");
    return new Gmud(id, story, repositoryId, version);
  }

  register(number: string, link: string, version?: string) {
    this._number = number;
    this._link = link;
    this._version = version ?? this._version;
    this._status = GmudStatus.PENDENTE;
  }

  schedule(date: string, time: string, version?: string) {
    this._date = date;
    this._time = time;
    this._status = GmudStatus.AGENDADA;
    this._version = version ?? this._version;
  }

  cancel() {
    this._status = GmudStatus.CANCELADA;
  }

  publish() {
    this._status = GmudStatus.PUBLICADA;
  }
}
