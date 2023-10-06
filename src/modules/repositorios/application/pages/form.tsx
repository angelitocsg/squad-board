import { useEffect, useState } from "react";
import FormInput from "../../../core/components/FormInput";
import RepoModel from "../data/RepoModel";
import SelectInput, {
  ISelectOptions,
} from "../../../core/components/SelectInput";
import { useService } from "../../../../di/DecouplerContext";
import ProductRepository from "../../../produto-digital/repository/ProductRepository";
import { RepositoryType } from "../../domain/Repo";

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
    var subscriber = productRepository.data$.subscribe((products) => {
      setProducts([
        { label: "", value: "" },
        ...products.map((p) => ({ label: p.name, value: p.id })),
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

  return (
    <div>
      <div className="row">
        <div className="col-4">
          <SelectInput
            label="Produto"
            field="productId"
            value={state.productId}
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
