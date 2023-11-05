import Sigla from "../domain/Sigla";

export default class SiglaDTO {
  id!: string;
  awsAccount?: string;
  awsDevEnvironmentId?: string;
  awsHomEnvironmentId?: string;
  awsPrdEnvironmentId?: string;
  description?: string;

  constructor(entity: Sigla) {
    this.id = entity.id;
    this.awsAccount = entity.awsAccount;
    this.description = entity.description;
    this.awsDevEnvironmentId = entity.awsDevEnvironmentId;
    this.awsHomEnvironmentId = entity.awsHomEnvironmentId;
    this.awsPrdEnvironmentId = entity.awsPrdEnvironmentId;
  }

  static toDomain(dto: SiglaDTO) {
    return Sigla.restore(
      dto.id,
      dto.awsAccount,
      dto.description,
      dto.awsDevEnvironmentId,
      dto.awsHomEnvironmentId,
      dto.awsPrdEnvironmentId,
    );
  }

  static fromDomain(entity: Sigla) {
    return new SiglaDTO(entity);
  }
}
