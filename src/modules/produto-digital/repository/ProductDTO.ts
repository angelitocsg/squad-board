import Product from "../domain/Product";

export default class ProductDTO {
  id!: string;
  sigla!: string;
  squad!: string;
  name!: string;
  description?: string;

  constructor(product: Product) {
    this.id = product.id;
    this.sigla = product.sigla;
    this.squad = product.squad;
    this.name = product.name;
    this.description = product.description;
  }

  static toDomain(dto: ProductDTO) {
    return Product.restore(dto.id, dto.sigla, dto.squad, dto.name, dto.description);
  }

  static fromDomain(entity: Product) {
    return new ProductDTO(entity);
  }
}
