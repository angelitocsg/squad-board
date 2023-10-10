import { useEffect, useState } from "react";

import { useService } from "../../../../di/DecouplerContext";
import { IActions, IColumns } from "../../../core/components/DisplayTable";
import ProductModel from "../../../produto-digital/application/data/ProductModel";
import ProductRepository from "../../../produto-digital/repository/ProductRepository";
import RepoRepository, { TFilterRepo } from "../../repository/RepoRepository";
import RepoModel from "../data/RepoModel";

const useTableRepository = () => {
  const productRepository = useService<ProductRepository>("ProductRepository");
  const [products, setProducts] = useState<ProductModel[]>([]);
  const repoRepository = useService<RepoRepository>("RepoRepository");
  const [lines, setLines] = useState<RepoModel[]>([]);

  useEffect(() => {
    productRepository.getAll();
    var subscriber = productRepository.data$.subscribe(items => {
      setProducts(items.map(item => ProductModel.fromDomain(item)));
    });
    return () => {
      subscriber.unsubscribe();
    };
  }, [productRepository]);

  useEffect(() => {
    var subscriber = repoRepository.data$.subscribe(items => {
      setLines(
        items.map(item => {
          return {
            ...RepoModel.fromDomain(item),
            product: products.find(x => x.id === item.productId)?.name,
            repoName: item.repository.split("/")[1],
          };
        }),
      );
    });
    return () => {
      subscriber.unsubscribe();
    };
  }, [products, repoRepository]);

  const loadRepositories = (filter?: TFilterRepo) => repoRepository.getAll(filter);

  const handleGithub = (line: RepoModel) => {
    const dlAnchorElem = document.createElement("a");
    dlAnchorElem?.setAttribute("href", `http://github.com/${line.repository}`);
    dlAnchorElem?.setAttribute("target", "_blank");
    dlAnchorElem?.setAttribute("rel", "noopener noreferrer");
    dlAnchorElem?.click();
    dlAnchorElem?.remove();
  };

  const handleDelete = (line: RepoModel) => {
    if (window.confirm("Excluir repositório?")) repoRepository.delete(line.id);
  };

  const tColumns: IColumns[] = [
    { field: "product", title: "Produto" },
    { field: "repoName", title: "Repositório" },
    { field: "type", title: "Tipo" },
    { field: "deploySequence", title: "Sequência" },
    { field: "siglaApp", title: "Sigla App" },
  ];

  const tActions: IActions[] = [
    {
      label: "github",
      onClick: handleGithub,
    },
    {
      label: "excluir",
      onClick: handleDelete,
    },
  ];

  return { tActions, tColumns, lines, loadRepositories };
};

export default useTableRepository;
