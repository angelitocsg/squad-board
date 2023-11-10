import { useEffect, useState } from "react";

import { useService } from "../../../../di/DecouplerContext";
import FormInput from "../../../core/components/FormInput";
import FormInputFilter from "../../../core/components/FormInputFilter";
import { ISelectOptions } from "../../../core/components/SelectInput";
import SiglaRepository from "../../repository/SiglaRepository";
import ProductModel from "../data/ProductModel";
import FormCheckBox from "../../../core/components/FormCheckBox";

type IProps = {
  data: ProductModel;
  onChange: (data: ProductModel) => void;
};

const ProductForm = ({ data, onChange }: IProps) => {
  const [state, setState] = useState<ProductModel>(data);
  const [siglas, setSiglas] = useState<ISelectOptions[]>([]);
  const siglaRepository = useService<SiglaRepository>("SiglaRepository");

  const handleChange = (e: any) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    siglaRepository.getAll();
    var subscriber = siglaRepository.data$.subscribe((siglas) => {
      setSiglas([
        { label: "", value: "" },
        ...siglas.map((p) => ({ label: p.id, value: p.id })),
      ]);
    });
    return () => {
      subscriber.unsubscribe();
    };
  }, [siglaRepository]);

  useEffect(() => {
    onChange && onChange(state);
  }, [onChange, state]);

  const getSiglaValue = () => {
    const _default = { label: "", value: "" };
    if (siglas.length === 0) return _default;
    const item = siglas.find((p) => p.value === state.sigla);
    return item ?? _default;
  };

  return (
    <div>
      <div className="row">
        <div className="col-2">
          <FormInputFilter
            label="Sigla"
            field="sigla"
            placeholder="Digite a sigla"
            value={getSiglaValue()}
            options={siglas}
            onChange={handleChange}
          />
        </div>
        <div className="col">
          <FormInput
            type="text"
            label="Squad"
            field="squad"
            value={state.squad}
            onChange={handleChange}
          />
        </div>
        <div className="col">
          <FormInput
            type="text"
            label="Produto"
            field="name"
            value={state.name}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-8">
          <FormInput
            type="textarea"
            label="Descrição"
            field="description"
            value={state.description}
            rows={5}
            onTextAreaChange={handleChange}
          />
        </div>
        <div className="col">
          <label className="mb-1">Monitoramento</label>
          <FormCheckBox
            label="Google Analytics"
            field="googleAnalytics"
            value={state.googleAnalytics}
            onChange={handleChange}
          />
          <FormCheckBox
            label="AppDynamics (Frontend)"
            field="appDynamicsFrontend"
            value={state.appDynamicsFrontend}
            onChange={handleChange}
          />
          <FormCheckBox
            label="AppDynamics (Backend)"
            field="appDynamicsBackend"
            value={state.appDynamicsBackend}
            onChange={handleChange}
          />
          <FormCheckBox
            label="Grafana (Cloudwatch)"
            field="grafanaCloudWatch"
            value={state.grafanaCloudWatch}
            onChange={handleChange}
          />
          <FormCheckBox
            label="Grafana (Prometheus)"
            field="grafanaPrometheus"
            value={state.grafanaPrometheus}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="row">
        <div className="col">
          <FormInput
            type="text"
            label="Sonarqube (Coverage)"
            field="sonarqubeCoverage"
            value={state.sonarqubeCoverage}
            onChange={handleChange}
          />
        </div>
        <div className="col">
          <FormInput
            type="date"
            label="Sonarqube"
            field="sonarqube"
            value={state.sonarqube}
            onChange={handleChange}
          />
        </div>
        <div className="col">
          <FormInput
            type="date"
            label="Fortify"
            field="fortify"
            value={state.fortify}
            onChange={handleChange}
          />
        </div>
        <div className="col">
          <FormInput
            type="date"
            label="IU Confia"
            field="iuConfia"
            value={state.iuConfia}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="disabled"
              name="disabled"
              checked={state.disabled ?? false}
              onChange={() =>
                handleChange({
                  target: {
                    name: "disabled",
                    value: !(state.disabled ?? false),
                  },
                })
              }
            />
            <label className="form-check-label" htmlFor="disabled">
              Desativado
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
