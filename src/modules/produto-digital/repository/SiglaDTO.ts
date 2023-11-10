import Sigla from "../domain/Sigla";

export default class SiglaDTO {
  id!: string;
  awsAccount?: string;
  awsDevEnvironmentId?: string;
  awsHomEnvironmentId?: string;
  awsPrdEnvironmentId?: string;
  awsTooEnvironmentId?: string;
  awsDevVpcId?: string;
  awsHomVpcId?: string;
  awsPrdVpcId?: string;
  awsDevVpcCidr?: string;
  awsHomVpcCidr?: string;
  awsPrdVpcCidr?: string;
  description?: string;
  permissions?: string;

  constructor(entity: Sigla) {
    this.id = entity.id;
    this.awsAccount = entity.awsAccount;
    this.description = entity.description;
    this.awsDevEnvironmentId = entity.awsDevEnvironmentId;
    this.awsHomEnvironmentId = entity.awsHomEnvironmentId;
    this.awsPrdEnvironmentId = entity.awsPrdEnvironmentId;
    this.awsTooEnvironmentId = entity.awsTooEnvironmentId;
    this.awsDevVpcId = entity.awsDevVpcId;
    this.awsHomVpcId = entity.awsHomVpcId;
    this.awsPrdVpcId = entity.awsPrdVpcId;
    this.awsDevVpcCidr = entity.awsDevVpcCidr;
    this.awsHomVpcCidr = entity.awsHomVpcCidr;
    this.awsPrdVpcCidr = entity.awsPrdVpcCidr;
    this.permissions = entity.permissions;
  }

  static toDomain(dto: SiglaDTO) {
    return Sigla.restore(
      dto.id,
      dto.awsAccount,
      dto.description,
      dto.awsDevEnvironmentId,
      dto.awsHomEnvironmentId,
      dto.awsPrdEnvironmentId,
      dto.awsTooEnvironmentId,
      dto.awsDevVpcId,
      dto.awsHomVpcId,
      dto.awsPrdVpcId,
      dto.awsDevVpcCidr,
      dto.awsHomVpcCidr,
      dto.awsPrdVpcCidr,
      dto.permissions,
    );
  }

  static fromDomain(entity: Sigla) {
    return new SiglaDTO(entity);
  }
}
