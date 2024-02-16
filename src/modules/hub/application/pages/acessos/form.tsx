import FormCheckBox from "../../../../core/components/FormCheckBox";
import FormInput from "../../../../core/components/FormInput";
import FormInputFilter from "../../../../core/components/FormInputFilter";
import AcessoModel from "../../data/AcessoModel";
import useForm from "./useForm";

type IProps = {
  data: AcessoModel;
  onChange: (data: AcessoModel) => void;
};

const AcessoForm = ({ data, onChange }: IProps) => {
  const { state, consumidores, handleChange, getConsumidorValue } = useForm({
    data,
    onChange,
  });

  return (
    <div>
      <div className="row">
        <div className="col-4">
          <FormInputFilter
            label="Consumidor"
            field="consumidorId"
            placeholder="Digite o nome do consumidor"
            value={getConsumidorValue()}
            options={consumidores}
            onChange={handleChange}
          />
        </div>
        <div className="col">
          <FormInput
            type="text"
            label="API Key"
            field="apiKey"
            value={state.apiKey}
            onChange={handleChange}
          />
        </div>
      </div>
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
        <div className="col-8">
          <FormInput
            type="text"
            label="Escopos"
            field="escopos"
            value={state.escopos}
            onChange={handleChange}
          />
        </div>
        <div className="col-2">
          <FormInput
            type="text"
            label="Data cadastro"
            field="dataCadastro"
            value={state.dataCadastro}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="mb-3 d-flex gap-4">
        <FormCheckBox
          label="Ativo"
          field="ativo"
          value={!!state.ativo}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default AcessoForm;
