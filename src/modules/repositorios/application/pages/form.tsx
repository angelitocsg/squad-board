import { useEffect, useState } from "react";

import { useService } from "../../../../di/DecouplerContext";
import { TBadge } from "../../../core/components/DisplayTable/BadgeType";
import FormInput from "../../../core/components/FormInput";
import FormInputFilter from "../../../core/components/FormInputFilter";
import SelectInput, {
  ISelectOptions,
} from "../../../core/components/SelectInput";
import ProductRepository from "../../../produto-digital/repository/ProductRepository";
import { CodeBaseType } from "../../types/CodeBaseType";
import { EnvStatusType } from "../../types/EnvStatusType";
import { RepositoryType } from "../../types/RepositoryType";
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

  const codeBaseTypes = () => {
    var items = Object.keys(CodeBaseType);
    var values = Object.values(CodeBaseType);
    return [
      { label: "", value: "" },
      ...items.map((item, i) => ({
        label: item.replace("_", " "),
        value: values[i],
      })),
    ];
  };

  const envStatusTypes = () => {
    var items = Object.keys(EnvStatusType);
    var values = Object.values(EnvStatusType);
    return [
      ...items.map((item, i) => ({
        label: `${item.replace("_", " ")}`,
        value: values[i],
        color: values[i].toString() as TBadge,
      })),
    ];
  };

  useEffect(() => {
    productRepository.getAll();
    var subscriber = productRepository.data$.subscribe((products) => {
      setProducts([
        { label: "", value: "" },
        ...products.map((p) => ({
          label: `${p.name} (${p.sigla.id})`,
          value: p.id,
        })),
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
    const item = products.find((p) => p.value === state.productId);
    return item ?? _default;
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
        <div className="col-8">
          <FormInput
            type="text"
            label="Descrição"
            field="description"
            value={state.description}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-4">
          <SelectInput
            label="Code base"
            field="codeBase"
            value={state.codeBase}
            options={codeBaseTypes()}
            onChange={handleChange}
          />
        </div>
        <div className="col">
          <FormInput
            type="text"
            label="Versão Pipeline"
            field="pipelineVersion"
            value={state.pipelineVersion}
            onChange={handleChange}
          />
        </div>
        <div className="col-2">
          <FormInput
            type="text"
            label="Sequência"
            field="deploySequence"
            value={state.deploySequence}
            list="deploySequenceOptions"
            onChange={handleChange}
          />
          <datalist id="deploySequenceOptions">
            <option value="0.0">0.0 (indefinido)</option>
            <option value="1.0">1.0 (infra)</option>
            <option value="1.1">1.1 (aplicação)</option>
            <option value="1.2">1.2 (gtw 1.0)</option>
            <option value="1.3">1.3</option>
            <option value="2.0">2.0 (cloudfront)</option>
            <option value="2.1">2.1</option>
            <option value="2.2">2.2</option>
            <option value="2.3">2.3</option>
            <option value="3.0">3.0</option>
            <option value="3.1">3.1</option>
            <option value="3.2">3.2</option>
            <option value="3.3">3.3</option>
          </datalist>
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
      <div className="row">
        <div className="col">
          <SelectInput
            variation="checkbox"
            label="Desenvolvimento"
            field="devStatus"
            value={state.devStatus}
            options={envStatusTypes()}
            onChange={handleChange}
          />
        </div>
        <div className="col">
          <SelectInput
            variation="checkbox"
            label="Homologação"
            field="homStatus"
            value={state.homStatus}
            options={envStatusTypes()}
            onChange={handleChange}
          />
        </div>
        <div className="col">
          <SelectInput
            variation="checkbox"
            label="Produção"
            field="prodStatus"
            value={state.prodStatus}
            options={envStatusTypes()}
            onChange={handleChange}
          />
        </div>
        <div className="col-6">
          <FormInput
            type="textarea"
            label="Anotações"
            field="notes"
            rows={6}
            value={state.notes}
            onTextAreaChange={handleChange}
          />
        </div>
      </div>
      {state.type === RepositoryType.GATEWAY ? (
        <div className="row">
          <div className="col">
            <FormInput
              type="text"
              label="Lambda Authorizer"
              field="gatewayAuthorizer"
              value={state.gatewayAuthorizer}
              onChange={handleChange}
            />
          </div>
          <div className="col">
            <FormInput
              type="text"
              label="Gateway Id Dev"
              field="gatewayIdDev"
              value={state.gatewayIdDev}
              onChange={handleChange}
            />
          </div>
          <div className="col">
            <FormInput
              type="text"
              label="Gateway Id Hom"
              field="gatewayIdHom"
              value={state.gatewayIdHom}
              onChange={handleChange}
            />
          </div>
          <div className="col">
            <FormInput
              type="text"
              label="Gateway Id Prod"
              field="gatewayIdPrd"
              value={state.gatewayIdPrd}
              onChange={handleChange}
            />
          </div>
        </div>
      ) : undefined}
    </div>
  );
};

export default RepoForm;
