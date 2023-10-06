import Product from "../../domain/Product";

export default class ProductModel {
  id: string = "";
  sigla: string = "";
  squad: string = "";
  name: string = "";

  static fromDomain(entity: Product): ProductModel {
    return {
      id: entity.id,
      sigla: entity.sigla,
      squad: entity.squad,
      name: entity.name,
    };
  }
}
