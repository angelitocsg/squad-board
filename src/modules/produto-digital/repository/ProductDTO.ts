import Product from "../domain/Product";
import Sigla from "../domain/Sigla";

export default class ProductDTO {
  id!: string;
  sigla!: string;
  squad!: string;
  name!: string;
  description?: string;
  disabled!: boolean;

  appDynamicsFrontend = false;
  appDynamicsBackend = false;
  googleAnalytics = false;
  grafanaCloudWatch = false;
  grafanaPrometheus = false;
  sonarqubeCoverage?: string;
  sonarqube?: string;
  fortify?: string;
  iuConfia?: string;

  constructor(product: Product) {
    this.id = product.id;
    this.sigla = product.sigla.id;
    this.squad = product.squad;
    this.name = product.name;
    this.description = product.description;
    this.disabled = product.disabled;
    this.appDynamicsFrontend = product.appDynamicsFrontend;
    this.appDynamicsBackend = product.appDynamicsBackend;
    this.googleAnalytics = product.googleAnalytics;
    this.grafanaCloudWatch = product.grafanaCloudWatch;
    this.grafanaPrometheus = product.grafanaPrometheus;
    this.sonarqubeCoverage = product.sonarqubeCoverage;
    this.sonarqube = product.sonarqube;
    this.fortify = product.fortify;
    this.iuConfia = product.iuConfia;
  }

  static toDomain(dto: ProductDTO) {
    return Product.restore(
      dto.id,
      Sigla.restore(dto.sigla),
      dto.squad,
      dto.name,
      dto.description,
      dto.disabled,
      dto.appDynamicsFrontend,
      dto.appDynamicsBackend,
      dto.googleAnalytics,
      dto.grafanaCloudWatch,
      dto.grafanaPrometheus,
      dto.sonarqubeCoverage,
      dto.sonarqube,
      dto.fortify,
      dto.iuConfia,
    );
  }

  static fromDomain(entity: Product) {
    return new ProductDTO(entity);
  }
}
