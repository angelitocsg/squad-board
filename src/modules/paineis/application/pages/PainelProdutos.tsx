import { useEffect, useState } from "react";

import { useService } from "../../../../di/DecouplerContext";
import PageLayout from "../../../../shared/PageLayout";
import DisplayTable from "../../../core/components/DisplayTable";
import ProductModel from "../../../produto-digital/application/data/ProductModel";
import ProductRepository from "../../../produto-digital/repository/ProductRepository";
import useTableRepository from "../../../repositorios/application/pages/useTableRepository";

const PainelProdutos = () => {
  const productRepository = useService<ProductRepository>("ProductRepository");
  const [products, setProducts] = useState<ProductModel[]>([]);
  const [currentProduct, setCurrentProduct] = useState<ProductModel>();
  const { tActionsView, tHeaderButtons, tColumns, lines, loadRepositories, handleEdit } =
    useTableRepository();

  useEffect(() => {
    productRepository.getAll();
    const subscriber = productRepository.data$.subscribe(items => {
      setProducts(items.map(item => ProductModel.fromDomain(item)));
    });
    return () => {
      subscriber.unsubscribe();
    };
  }, [productRepository]);

  const handleProductSelect = (product: ProductModel) => {
    setCurrentProduct(product);
    loadRepositories({ productId: product.id });
  };

  return (
    <PageLayout title="Painel de produtos">
      <div className="d-flex justify-content-start flex-wrap gap-2">
        {products.map(product => (
          <div
            key={product.id}
            className={`card ${
              currentProduct?.name === product.name ? "bg-secondary bg-opacity-25" : ""
            }`}
            role="button"
            onClick={() => handleProductSelect(product)}>
            <div className="card-body p-2">
              <span className="bi bi-boxes ps-2 pe-3" style={{ fontSize: "1.5em" }} />
              <span className="pe-2">
                {product.name} ({product.sigla})
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <h2 className="h5">{currentProduct?.name}</h2>
        <hr className="mt-2 mb-3" />
      </div>
      <div>
        <DisplayTable
          actions={tActionsView}
          columns={tColumns}
          headerButtons={tHeaderButtons}
          lines={lines}
          onLineClick={handleEdit}
        />
      </div>
    </PageLayout>
  );
};

export default PainelProdutos;
