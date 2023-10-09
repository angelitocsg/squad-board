import { useEffect, useState } from "react";

import { useService } from "../../../../di/DecouplerContext";
import AlertModalService from "../../../core/components/AlertModal/AlertModalService";
import AppModalService from "../../../core/components/AppModal/AppModalService";
import { IActions, IColumns } from "../../../core/components/DisplayTable";
import { IHeaderActions } from "../../../core/components/DisplayTable/headerActions";
import Product from "../../domain/Product";
import ProductRepository from "../../repository/ProductRepository";
import ProductModel from "../data/ProductModel";
import ProductStore from "../data/ProductStore";
import ProductForm from "./form";

const useController = () => {
  const modalService = useService<AppModalService>("AppModalService");
  const alertService = useService<AlertModalService>("AlertModalService");
  const productStore = useService<ProductStore>("ProductStore");
  const productRepository = useService<ProductRepository>("ProductRepository");
  const [lines, setLines] = useState<ProductModel[]>([]);
  const tColumns: IColumns[] = [
    { field: "sigla", title: "Sigla" },
    { field: "squad", title: "Squad" },
    { field: "name", title: "Produto" },
    { field: "descriptionTruncated", title: "Descrição" },
  ];

  useEffect(() => {
    document.title = "Produtos digitais | Squad";
  }, []);

  useEffect(() => {
    productRepository.getAll();
    var subscriber = productRepository.data$.subscribe(products => {
      const _max = 20;
      const _description = (d?: string) =>
        (d ?? "").length > _max ? `${d?.substring(0, _max)}...` : d ? d : "-";
      setLines(
        products.map(product => ({
          ...ProductModel.fromDomain(product),
          descriptionTruncated: _description(
            ProductModel.fromDomain(product).description,
          ),
        })),
      );
    });
    return () => {
      subscriber.unsubscribe();
    };
  }, [productRepository]);

  const handleSave = () => {
    try {
      const model = productStore.current;
      const product = Product.create(
        model.sigla,
        model.squad,
        model.name,
        model.description,
      );
      if (!model.id) productRepository.create(product);
      else productRepository.update(model.id, product.updateId(model.id));
      modalService.close();
    } catch (e: any) {
      showMessage("error", e.message);
    }
  };

  const showMessage = (type: "error" | "info", message: string) => {
    alertService
      .config({
        type: type,
        title: "Erro",
        buttonOkLabel: "Ok",
        buttonCancelHidden: true,
        children: () => <span>{message}</span>,
      })
      .open();
  };

  const handleNew = () => {
    const model = new ProductModel();
    productStore.updateCurrent(model);
    modalService
      .config({
        title: "novo produto digital",
        size: "large",
        buttonOkLabel: "Criar",
        buttonOkAction: handleSave,
        children: () => (
          <ProductForm
            data={model}
            onChange={state => {
              productStore.updateCurrent(state);
            }}
          />
        ),
      })
      .open();
  };

  const handleEdit = (line: ProductModel) => {
    const model = lines.find(x => x.id === line.id);
    if (!model) return;
    modalService
      .config({
        title: `editar produto digital (${line.id.split("-")[0]})`,
        size: "large",
        buttonOkLabel: "Salvar",
        buttonOkAction: handleSave,
        children: () => (
          <ProductForm
            data={model}
            onChange={state => {
              productStore.updateCurrent(state);
            }}
          />
        ),
      })
      .open();
  };

  const handleDelete = (line: ProductModel) => {
    if (window.confirm("Excluir produto digital?"))
      productRepository.delete(line.id);
  };

  const tActions: IActions[] = [
    {
      label: "excluir",
      onClick: handleDelete,
    },
  ];

  const tHeaderButtons: IHeaderActions = {
    buttonNew: {
      label: "Novo",
      action: handleNew,
    },
  };

  return { tActions, tColumns, tHeaderButtons, lines, handleNew, handleEdit };
};

export default useController;
