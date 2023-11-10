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
      <div className="row">
        <div className="col">
          <FormInput
            type="text"
            label="VPC ID DEV"
            field="awsDevVpcId"
            value={state.awsDevVpcId}
            onChange={handleChange}
          />
        </div>
        <div className="col">
          <FormInput
            type="text"
            label="VPC ID HOM"
            field="awsHomVpcId"
            value={state.awsHomVpcId}
            onChange={handleChange}
          />
        </div>
        <div className="col">
          <FormInput
            type="text"
            label="VPC ID PROD"
            field="awsPrdVpcId"
            value={state.awsPrdVpcId}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <FormInput
            type="text"
            label="VPC CIDR DEV"
            field="awsDevVpcCidr"
            placeholder="0.0.0.0/0"
            value={state.awsDevVpcCidr}
            onChange={handleChange}
          />
        </div>
        <div className="col">
          <FormInput
            type="text"
            label="VPC CIDR HOM"
            field="awsHomVpcCidr"
            placeholder="0.0.0.0/0"
            value={state.awsHomVpcCidr}
            onChange={handleChange}
          />
        </div>
        <div className="col">
          <FormInput
            type="text"
            label="VPC CIDR PROD"
            field="awsPrdVpcCidr"
            placeholder="0.0.0.0/0"
            value={state.awsPrdVpcCidr}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="row">
        <div className="col">
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
          <FormInput
            type="textarea"
            label="Permissões"
            field="permissions"
            value={state.permissions}
            rows={5}
            onTextAreaChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default SiglaForm;
