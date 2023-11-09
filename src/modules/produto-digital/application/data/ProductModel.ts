import Product from "../../domain/Product";
import Sigla from "../../domain/Sigla";

export default class ProductModel {
  id: string = "";
  sigla: string = "";
  squad: string = "";
  name: string = "";
  description?: string = "";
  disabled: boolean = false;

  static toDomain(model: ProductModel): Product {
    const product = Product.create(
      Sigla.create(model.sigla),
      model.squad,
      model.name,
      model.description,
      model.disabled,
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
    };
  }
}
