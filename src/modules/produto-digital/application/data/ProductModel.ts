import Product from "../../domain/Product";

export default class ProductModel {
  id: string = "";
  sigla: string = "";
  squad: string = "";
  name: string = "";

  fromDomain(entity: Product): ProductModel {
    return {
      id: entity.id,
      sigla: entity.sigla,
      squad: entity.squad,
      name: entity.name,
      fromDomain: this.fromDomain,
      toDomain: this.toDomain,
    };
  }

  toDomain() {
    return Product.restore(this.id, this.sigla, this.squad, this.name);
  }
}
