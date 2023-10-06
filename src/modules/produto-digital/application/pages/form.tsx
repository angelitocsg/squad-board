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
      </div>
    </div>
  );
};

export default ProductForm;
