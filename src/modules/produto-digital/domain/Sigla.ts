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
  private _awsDevVpcId?: string;
  get awsDevVpcId() {
    return this._awsDevVpcId;
  }
  private _awsHomVpcId?: string;
  get awsHomVpcId() {
    return this._awsHomVpcId;
  }
  private _awsPrdVpcId?: string;
  get awsPrdVpcId() {
    return this._awsPrdVpcId;
  }
  private _awsDevVpcCidr?: string;
  get awsDevVpcCidr() {
    return this._awsDevVpcCidr;
  }
  private _awsHomVpcCidr?: string;
  get awsHomVpcCidr() {
    return this._awsHomVpcCidr;
  }
  private _awsPrdVpcCidr?: string;
  get awsPrdVpcCidr() {
    return this._awsPrdVpcCidr;
  }
  private _description?: string;
  get description() {
    return this._description;
  }
  private _permissions?: string;
  get permissions() {
    return this._permissions;
  }

  private constructor(
    id: string,
    awsAccount?: string,
    description?: string,
    awsDevEnvironmentId?: string,
    awsHomEnvironmentId?: string,
    awsPrdEnvironmentId?: string,
    awsTooEnvironmentId?: string,
    awsDevVpcId?: string,
    awsHomVpcId?: string,
    awsPrdVpcId?: string,
    awsDevVpcCidr?: string,
    awsHomVpcCidr?: string,
    awsPrdVpcCidr?: string,
    permissions?: string,
  ) {
    this._id = id;
    this._awsAccount = awsAccount ?? "";
    this._description = description ?? "";
    this._awsDevEnvironmentId = awsDevEnvironmentId ?? "";
    this._awsHomEnvironmentId = awsHomEnvironmentId ?? "";
    this._awsPrdEnvironmentId = awsPrdEnvironmentId ?? "";
    this._awsTooEnvironmentId = awsTooEnvironmentId ?? "";
    this._awsDevVpcId = awsDevVpcId ?? "";
    this._awsHomVpcId = awsHomVpcId ?? "";
    this._awsPrdVpcId = awsPrdVpcId ?? "";
    this._awsDevVpcCidr = awsDevVpcCidr ?? "";
    this._awsHomVpcCidr = awsHomVpcCidr ?? "";
    this._awsPrdVpcCidr = awsPrdVpcCidr ?? "";
    this._permissions = permissions ?? "";
  }

  static create(
    id: string,
    awsAccount?: string,
    description?: string,
    awsDevEnvironmentId?: string,
    awsHomEnvironmentId?: string,
    awsPrdEnvironmentId?: string,
    awsTooEnvironmentId?: string,
    awsDevVpcId?: string,
    awsHomVpcId?: string,
    awsPrdVpcId?: string,
    awsDevVpcCidr?: string,
    awsHomVpcCidr?: string,
    awsPrdVpcCidr?: string,
    permissions?: string,
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
      awsDevVpcId,
      awsHomVpcId,
      awsPrdVpcId,
      awsDevVpcCidr,
      awsHomVpcCidr,
      awsPrdVpcCidr,
      permissions,
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
    awsDevVpcId?: string,
    awsHomVpcId?: string,
    awsPrdVpcId?: string,
    awsDevVpcCidr?: string,
    awsHomVpcCidr?: string,
    awsPrdVpcCidr?: string,
    permissions?: string,
  ) {
    return new Sigla(
      id,
      awsAccount,
      description,
      awsDevEnvironmentId,
      awsHomEnvironmentId,
      awsPrdEnvironmentId,
      awsTooEnvironmentId,
      awsDevVpcId,
      awsHomVpcId,
      awsPrdVpcId,
      awsDevVpcCidr,
      awsHomVpcCidr,
      awsPrdVpcCidr,
      permissions,
    );
  }
}
