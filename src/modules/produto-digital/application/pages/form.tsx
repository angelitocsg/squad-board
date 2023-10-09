import { useEffect, useState } from "react";
import FormInput from "../../../core/components/FormInput";
import ProductModel from "../data/ProductModel";

type IProps = {
  data: ProductModel;
  onChange: (data: ProductModel) => void;
};

const ProductForm = ({ data, onChange }: IProps) => {
  const [state, setState] = useState<ProductModel>(data);

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
        <div className="col-2">
          <FormInput
            type="text"
            label="Sigla"
            field="sigla"
            value={state.sigla}
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
        <FormInput
          type="textarea"
          label="Descrição"
          field="description"
          value={state.description}
          rows={4}
          onTextAreaChange={handleChange}
        />
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
                  handleChange({ target: { name: "disabled", value: !(state.disabled ?? false) } })
                }
              />
              <label className="form-check-label" htmlFor="disabled">
                Desativado
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
