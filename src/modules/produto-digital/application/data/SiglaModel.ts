import Sigla from "../../domain/Sigla";

export default class SiglaModel {
  id: string = "";
  awsAccount?: string = "";
  awsDevEnvironmentId?: string = "";
  awsHomEnvironmentId?: string = "";
  awsPrdEnvironmentId?: string = "";
  awsTooEnvironmentId?: string = "";
  awsDevVpcId?: string = "";
  awsHomVpcId?: string = "";
  awsPrdVpcId?: string = "";
  awsDevVpcCidr?: string = "";
  awsHomVpcCidr?: string = "";
  awsPrdVpcCidr?: string = "";
  description?: string = "";
  permissions?: string = "";

  static toDomain(model: SiglaModel): Sigla {
    const sigla = Sigla.create(
      model.id,
      model.awsAccount,
      model.description,
      model.awsDevEnvironmentId,
      model.awsHomEnvironmentId,
      model.awsPrdEnvironmentId,
      model.awsTooEnvironmentId,
      model.awsDevVpcId,
      model.awsHomVpcId,
      model.awsPrdVpcId,
      model.awsDevVpcCidr,
      model.awsHomVpcCidr,
      model.awsPrdVpcCidr,
      model.permissions,
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
      awsDevVpcId: entity.awsDevVpcId,
      awsHomVpcId: entity.awsHomVpcId,
      awsPrdVpcId: entity.awsPrdVpcId,
      awsDevVpcCidr: entity.awsDevVpcCidr,
      awsHomVpcCidr: entity.awsHomVpcCidr,
      awsPrdVpcCidr: entity.awsPrdVpcCidr,
      permissions: entity.permissions,
    };
  }
}
