import FormInput from "../../../../core/components/FormInput";
import FormInputFilter from "../../../../core/components/FormInputFilter";
import ContatoModel from "../../data/ContatoModel";
import useForm from "./useForm";

type IProps = {
  data: ContatoModel;
  onChange: (data: ContatoModel) => void;
};

const ContatoForm = ({ data, onChange }: IProps) => {
  const { state, consumidores, handleChange, getConsumidorValue } = useForm({
    data,
    onChange,
  });

  return (
    <div>
      <div className="row">
        <div className="col">
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
            label="Nome"
            field="nome"
            value={state.nome}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <FormInput
            type="tel"
            label="Telefone"
            field="telefone"
            value={state.telefone}
            onChange={handleChange}
          />
        </div>
        <div className="col">
          <FormInput
            type="email"
            label="E-mail"
            field="email"
            value={state.email}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ContatoForm;
