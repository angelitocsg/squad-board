import Sigla from "../../domain/Sigla";

export default class SiglaModel {
  id: string = "";
  awsAccount?: string = "";
  awsDevEnvironmentId?: string = "";
  awsHomEnvironmentId?: string = "";
  awsPrdEnvironmentId?: string = "";
  description?: string = "";

  constructor(entity: Sigla) {
    this.id = entity.id;
    this.awsAccount = entity.awsAccount;
    this.awsDevEnvironmentId = entity.awsDevEnvironmentId;
    this.awsHomEnvironmentId = entity.awsHomEnvironmentId;
    this.awsPrdEnvironmentId = entity.awsPrdEnvironmentId;
    this.description = entity.description;
  }

  static fromDomain(entity: Sigla): SiglaModel {
    return {
      id: entity.id,
      awsAccount: entity.awsAccount,
      awsDevEnvironmentId: entity.awsDevEnvironmentId,
      awsHomEnvironmentId: entity.awsHomEnvironmentId,
      awsPrdEnvironmentId: entity.awsPrdEnvironmentId,
      description: entity.description,
    };
  }
}
