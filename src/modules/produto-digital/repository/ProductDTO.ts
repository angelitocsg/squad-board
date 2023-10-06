import Product from "../domain/Product";

export default class ProductDTO {
  id!: string;
  sigla!: string;
  squad!: string;
  name!: string;

  constructor(product: Product) {
    this.id = product.id;
    this.sigla = product.sigla;
    this.squad = product.squad;
    this.name = product.name;
  }

  static toDomain(dto: ProductDTO) {
    return Product.restore(dto.id, dto.sigla, dto.squad, dto.name);
  }

  static fromDomain(entity: Product) {
    return new ProductDTO(entity);
  }
}
