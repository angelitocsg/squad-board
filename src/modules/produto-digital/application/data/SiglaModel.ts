import Sigla from "../../domain/Sigla";

export default class SiglaModel {
  id: string = "";
  awsAccount?: string = "";
  awsDevEnvironmentId?: string = "";
  awsHomEnvironmentId?: string = "";
  awsPrdEnvironmentId?: string = "";
  description?: string = "";

  static fromDomain(entity: Sigla): SiglaModel {
    return {
      id: entity.id,
      awsAccount: entity.awsAccount,
      description: entity.description,
      awsDevEnvironmentId: entity.awsDevEnvironmentId,
      awsHomEnvironmentId: entity.awsHomEnvironmentId,
      awsPrdEnvironmentId: entity.awsPrdEnvironmentId,
    };
  }
}
