import Sigla from "../../domain/Sigla";

export default class SiglaModel {
  id: string = "";
  awsAccount?: string = "";
  awsDevEnvironmentId?: string = "";
  awsHomEnvironmentId?: string = "";
  awsPrdEnvironmentId?: string = "";
  awsTooEnvironmentId?: string = "";
  description?: string = "";

  static toDomain(model: SiglaModel): Sigla {
    const sigla = Sigla.create(
      model.id,
      model.awsAccount,
      model.description,
      model.awsDevEnvironmentId,
      model.awsHomEnvironmentId,
      model.awsPrdEnvironmentId,
      model.awsTooEnvironmentId,
    );
    return sigla;
  }

  static fromDomain(entity: Sigla): SiglaModel {
    return {
      id: entity.id,
      awsAccount: entity.awsAccount,
      description: entity.description,
      awsDevEnvironmentId: entity.awsDevEnvironmentId,
      awsHomEnvironmentId: entity.awsHomEnvironmentId,
      awsPrdEnvironmentId: entity.awsPrdEnvironmentId,
      awsTooEnvironmentId: entity.awsTooEnvironmentId,
    };
  }
}
