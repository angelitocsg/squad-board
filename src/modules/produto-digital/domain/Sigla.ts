export default class Sigla {
  private _id: string;
  get id() {
    return this._id;
  }
  private _awsAccount?: string;
  get awsAccount() {
    return this._awsAccount;
  }
  private _awsDevEnvironmentId?: string;
  get awsDevEnvironmentId() {
    return this._awsDevEnvironmentId;
  }
  private _awsHomEnvironmentId?: string;
  get awsHomEnvironmentId() {
    return this._awsHomEnvironmentId;
  }
  private _awsPrdEnvironmentId?: string;
  get awsPrdEnvironmentId() {
    return this._awsPrdEnvironmentId;
  }
  private _awsTooEnvironmentId?: string;
  get awsTooEnvironmentId() {
    return this._awsTooEnvironmentId;
  }
  private _description?: string;
  get description() {
    return this._description;
  }

  private constructor(
    id: string,
    awsAccount?: string,
    description?: string,
    awsDevEnvironmentId?: string,
    awsHomEnvironmentId?: string,
    awsPrdEnvironmentId?: string,
    awsTooEnvironmentId?: string,
  ) {
    this._id = id;
    this._awsAccount = awsAccount ?? "";
    this._description = description ?? "";
    this._awsDevEnvironmentId = awsDevEnvironmentId ?? "";
    this._awsHomEnvironmentId = awsHomEnvironmentId ?? "";
    this._awsPrdEnvironmentId = awsPrdEnvironmentId ?? "";
    this._awsTooEnvironmentId = awsTooEnvironmentId ?? "";
  }

  static create(
    id: string,
    awsAccount?: string,
    description?: string,
    awsDevEnvironmentId?: string,
    awsHomEnvironmentId?: string,
    awsPrdEnvironmentId?: string,
    awsTooEnvironmentId?: string,
  ) {
    if (!id) throw Error("A sigla deve ser informada");
    return new Sigla(
      id,
      awsAccount,
      description,
      awsDevEnvironmentId,
      awsHomEnvironmentId,
      awsPrdEnvironmentId,
      awsTooEnvironmentId,
    );
  }

  static restore(
    id: string,
    awsAccount?: string,
    description?: string,
    awsDevEnvironmentId?: string,
    awsHomEnvironmentId?: string,
    awsPrdEnvironmentId?: string,
    awsTooEnvironmentId?: string,
  ) {
    return new Sigla(
      id,
      awsAccount,
      description,
      awsDevEnvironmentId,
      awsHomEnvironmentId,
      awsPrdEnvironmentId,
      awsTooEnvironmentId,
    );
  }
}
