import { Observable } from "rxjs";
import Product from "../domain/Product";

export type TFilter = {
  sigla?: string;
};

export default interface ProductRepository {
  data$: Observable<Product[]>;
  getAll: (filter?: TFilter) => Product[];
  getById: (id: string) => Product | undefined;
  create: (entity: Product) => Product;
  update: (id: string, entity: Product) => Product;
  delete: (id: string) => void;
}
