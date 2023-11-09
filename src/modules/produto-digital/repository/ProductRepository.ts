import { Observable } from "rxjs";

import Product from "../domain/Product";
import ProductDTO from "./ProductDTO";

export type TFilter = {
  sigla?: string;
  disabled?: boolean;
};

export default interface ProductRepository {
  data$: Observable<Product[]>;
  getAll: (filter?: TFilter) => Product[];
  export: () => ProductDTO[];
  getById: (id: string) => Product | undefined;
  create: (entity: Product) => Product;
  update: (id: string, entity: Product) => Product;
  delete: (id: string) => void;
}
