import { useEffect, useState } from "react";
import FormInput from "../../../../core/components/FormInput";
import SiglaModel from "../../data/SiglaModel";

type IProps = {
  data: SiglaModel;
  onChange: (data: SiglaModel) => void;
};

const SiglaForm = ({ data, onChange }: IProps) => {
  const [state, setState] = useState<SiglaModel>(data);

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
        <div className="col-3">
          <FormInput
            type="text"
            label="Sigla"
            field="id"
            value={state.id}
            onChange={handleChange}
          />
        </div>
        <div className="col">
          <FormInput
            type="text"
            label="AWS Account"
            field="awsAccount"
            value={state.awsAccount}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <FormInput
            type="text"
            label="ID DEV"
            field="awsDevEnvironmentId"
            value={state.awsDevEnvironmentId}
            onChange={handleChange}
          />
        </div>
        <div className="col">
          <FormInput
            type="text"
            label="ID HOM"
            field="awsHomEnvironmentId"
            value={state.awsHomEnvironmentId}
            onChange={handleChange}
          />
        </div>
        <div className="col">
          <FormInput
            type="text"
            label="ID PROD"
            field="awsPrdEnvironmentId"
            value={state.awsPrdEnvironmentId}
            onChange={handleChange}
          />
        </div>
        <div className="col">
          <FormInput
            type="text"
            label="ID TOOL"
            field="awsTooEnvironmentId"
            value={state.awsTooEnvironmentId}
            onChange={handleChange}
          />
        </div>
      </div>
      <FormInput
        type="textarea"
        label="Descrição"
        field="description"
        value={state.description}
        rows={4}
        onTextAreaChange={handleChange}
      />
    </div>
  );
};

export default SiglaForm;
