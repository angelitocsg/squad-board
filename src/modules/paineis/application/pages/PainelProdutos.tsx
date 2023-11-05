import { useEffect, useState } from "react";

import { Tab, TabContent, TabContentGroup, TabGroup } from "../../../../components/Tab";
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
  const [siglasFromProduct, setSiglasFromProduct] = useState<string[]>([]);
  const { tActionsView, tHeaderButtons, tColumns, lines, loadRepositories, handleEdit } =
    useTableRepository();

  useEffect(() => {
    productRepository.getAll();
    const subscriber = productRepository.data$.subscribe((items) => {
      const siglas = items
        .reduce((p, c) => {
          if (!p.some((x) => x === c.sigla.id)) p.push(c.sigla.id);
          return p;
        }, [] as string[])
        .sort((a, b) => a.localeCompare(b));
      setSiglasFromProduct(siglas);
      console.log({ siglas });

      setProducts(items.map((item) => ProductModel.fromDomain(item)));
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
      <TabGroup>
        {siglasFromProduct.map((sigla, i) => (
          <Tab active={i === 0} tabId={`${sigla}-tab`} tabLabel={sigla} />
        ))}
      </TabGroup>

      <TabContentGroup>
        {siglasFromProduct.map((sigla, i) => (
          <TabContent active={i === 0} tabId={`${sigla}-tab`}>
            <div className="d-flex justify-content-start flex-wrap gap-2">
              {products
                .filter((p) => p.sigla === sigla)
                .map((product) => (
                  <div
                    key={product.id}
                    className={`card ${
                      currentProduct?.name === product.name ? "bg-secondary bg-opacity-25" : ""
                    }`}
                    role="button"
                    onClick={() => handleProductSelect(product)}>
                    <div className="card-body p-2 px-3">
                      {/* <span className="bi bi-boxes ps-2 pe-3" style={{ fontSize: "1.5em" }} /> */}
                      {product.name}
                    </div>
                  </div>
                ))}
            </div>
          </TabContent>
        ))}
      </TabContentGroup>
      <div className="mt-4">
        <h2 className="h5">{currentProduct?.name} ({currentProduct?.sigla})</h2>
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
