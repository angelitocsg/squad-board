import Product from "../domain/Product";
import Sigla from "../domain/Sigla";

export default class ProductDTO {
  id!: string;
  sigla!: string;
  squad!: string;
  name!: string;
  description?: string;
  disabled!: boolean;

  constructor(product: Product) {
    this.id = product.id;
    this.sigla = product.sigla.id;
    this.squad = product.squad;
    this.name = product.name;
    this.description = product.description;
    this.disabled = product.disabled;
  }

  static toDomain(dto: ProductDTO) {
    return Product.restore(
      dto.id,
      Sigla.restore(dto.sigla),
      dto.squad,
      dto.name,
      dto.description,
      dto.disabled,
    );
  }

  static fromDomain(entity: Product) {
    return new ProductDTO(entity);
  }
}
