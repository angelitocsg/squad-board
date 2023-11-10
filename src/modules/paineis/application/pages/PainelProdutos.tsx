import { useEffect, useState } from "react";

import {
  Tab,
  TabContent,
  TabContentGroup,
  TabGroup,
} from "../../../../components/Tab";
import { useService } from "../../../../di/DecouplerContext";
import PageLayout from "../../../../shared/PageLayout";
import AppModalService from "../../../core/components/AppModal/AppModalService";
import DisplayTable from "../../../core/components/DisplayTable";
import ProductModel from "../../../produto-digital/application/data/ProductModel";
import ProductRepository from "../../../produto-digital/repository/ProductRepository";
import SiglaRepository from "../../../produto-digital/repository/SiglaRepository";
import RepoModel from "../../../repositorios/application/data/RepoModel";
import useTableRepository from "../../../repositorios/application/pages/useTableRepository";

const PainelProdutos = () => {
  const productRepository = useService<ProductRepository>("ProductRepository");
  const siglaRepository = useService<SiglaRepository>("SiglaRepository");
  const modalService = useService<AppModalService>("AppModalService");
  const [products, setProducts] = useState<ProductModel[]>([]);
  const [currentProduct, setCurrentProduct] = useState<ProductModel>();
  const [siglas, setSiglas] = useState<string[]>([]);
  const {
    tActionsView,
    tHeaderButtonsView,
    tColumns,
    lines,
    loadRepositories,
    handleEdit,
  } = useTableRepository();

  useEffect(() => {
    document.title = "Produtos digitais - Painel | Squad";
  }, []);

  useEffect(() => {
    siglaRepository.getAll();
    const subscriber = siglaRepository.data$.subscribe((items) => {
      setSiglas(items.map((item) => item.id));
    });
    return () => {
      subscriber.unsubscribe();
    };
  }, [siglaRepository]);

  useEffect(() => {
    productRepository.getAll();
    const subscriber = productRepository.data$.subscribe((items) => {
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

  const handleEditAndFilter = (line: RepoModel) => {
    handleEdit(line);
    const sub = modalService.visibility$.subscribe((value) => {
      if (!value) {
        sub.unsubscribe();
        currentProduct && handleProductSelect(currentProduct);
      }
    });
  };

  return (
    <PageLayout title="Painel de produtos">
      <TabGroup>
        {siglas.map((sigla, i) => (
          <Tab
            key={i}
            active={i === 0}
            tabId={`${sigla}-tab`}
            tabLabel={sigla}
          />
        ))}
      </TabGroup>

      <TabContentGroup>
        {siglas.map((sigla, i) => (
          <TabContent key={i} active={i === 0} tabId={`${sigla}-tab`}>
            <div className="d-flex justify-content-start flex-wrap gap-2">
              {products
                .filter((p) => p.sigla === sigla)
                .map((product) => (
                  <div
                    key={product.id}
                    className={`card ${
                      currentProduct?.name === product.name
                        ? "bg-secondary bg-opacity-25"
                        : ""
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

      {currentProduct ? (
        <>
          <div className="mt-4">
            <h2 className="h5">
              {currentProduct?.name} ({currentProduct?.sigla})
            </h2>
            <hr className="mt-2 mb-3" />
          </div>
          <div>
            <DisplayTable
              actions={tActionsView}
              columns={tColumns}
              headerButtons={tHeaderButtonsView}
              lines={lines}
              onLineClick={handleEditAndFilter}
            />
          </div>
        </>
      ) : undefined}
    </PageLayout>
  );
};

export default PainelProdutos;
