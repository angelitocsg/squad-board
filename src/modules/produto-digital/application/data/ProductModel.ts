import Product from "../../domain/Product";
import Sigla from "../../domain/Sigla";

export default class ProductModel {
  id: string = "";
  sigla: string = "";
  squad: string = "";
  name: string = "";
  description?: string = "";
  disabled: boolean = false;

  appDynamicsFrontend = false;
  appDynamicsBackend = false;
  googleAnalytics = false;
  grafanaCloudWatch = false;
  grafanaPrometheus = false;
  sonarqubeCoverage?: string = "";
  sonarqube?: string = "";
  fortify?: string = "";
  iuConfia?: string = "";

  static toDomain(model: ProductModel): Product {
    const product = Product.create(
      Sigla.create(model.sigla),
      model.squad,
      model.name,
      model.description,
      model.disabled,
      model.appDynamicsFrontend,
      model.appDynamicsBackend,
      model.googleAnalytics,
      model.grafanaCloudWatch,
      model.grafanaPrometheus,
      model.sonarqubeCoverage,
      model.sonarqube,
      model.fortify,
      model.iuConfia,
    );
    return product;
  }

  static fromDomain(entity: Product): ProductModel {
    return {
      id: entity.id,
      sigla: entity.sigla.id,
      squad: entity.squad,
      name: entity.name,
      description: entity.description,
      disabled: entity.disabled,
      appDynamicsFrontend: entity.appDynamicsFrontend,
      appDynamicsBackend: entity.appDynamicsBackend,
      googleAnalytics: entity.googleAnalytics,
      grafanaCloudWatch: entity.grafanaCloudWatch,
      grafanaPrometheus: entity.grafanaPrometheus,
      sonarqubeCoverage: entity.sonarqubeCoverage,
      sonarqube: entity.sonarqube,
      fortify: entity.fortify,
      iuConfia: entity.iuConfia,
    };
  }
}
