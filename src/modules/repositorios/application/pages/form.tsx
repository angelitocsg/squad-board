import { useEffect, useState } from "react";

import { useService } from "../../../../di/DecouplerContext";
import FormInput from "../../../core/components/FormInput";
import FormInputFilter from "../../../core/components/FormInputFilter";
import SelectInput, { ISelectOptions } from "../../../core/components/SelectInput";
import ProductRepository from "../../../produto-digital/repository/ProductRepository";
import { RepositoryType } from "../../domain/Repo";
import RepoModel from "../data/RepoModel";

type IProps = {
  data: RepoModel;
  onChange: (data: RepoModel) => void;
};

const RepoForm = ({ data, onChange }: IProps) => {
  const [state, setState] = useState<RepoModel>(data);
  const [products, setProducts] = useState<ISelectOptions[]>([]);
  const productRepository = useService<ProductRepository>("ProductRepository");

  const repositoryTypes = () => {
    var items = Object.keys(RepositoryType);
    var values = Object.values(RepositoryType);
    return [
      { label: "", value: "" },
      ...items.map((item, i) => ({
        label: item.replace("_", " "),
        value: values[i],
      })),
    ];
  };

  useEffect(() => {
    productRepository.getAll();
    var subscriber = productRepository.data$.subscribe(products => {
      setProducts([
        { label: "", value: "" },
        ...products.map(p => ({ label: p.name, value: p.id })),
      ]);
    });
    return () => {
      subscriber.unsubscribe();
    };
  }, [productRepository]);

  const handleChange = (e: any) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    onChange && onChange(state);
  }, [onChange, state]);

  const getProductValue = () => {
    const _default = { label: "", value: "" };
    if (products.length === 0) return _default;
    const product = products.find(p => p.value === state.productId);
    return product ?? _default;
  };

  return (
    <div>
      <div className="row">
        <div className="col-4">
          <FormInputFilter
            label="Produto"
            field="productId"
            placeholder="Digite o nome do produto"
            value={getProductValue()}
            options={products}
            onChange={handleChange}
          />
        </div>
        <div className="col">
          <FormInput
            type="text"
            label="Repositório"
            field="repository"
            value={state.repository}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <SelectInput
            label="Tipo"
            field="type"
            value={state.type}
            options={repositoryTypes()}
            onChange={handleChange}
          />
        </div>
        <div className="col">
          <FormInput
            type="text"
            label="Sequência"
            field="deploySequence"
            value={state.deploySequence}
            onChange={handleChange}
          />
        </div>
        <div className="col">
          <FormInput
            type="text"
            label="Sigla App"
            field="siglaApp"
            value={state.siglaApp}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default RepoForm;
