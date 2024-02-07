import { useEffect, useState } from "react";

import { useService } from "../../../../di/DecouplerContext";
import FormInput from "../../../core/components/FormInput";
import FormInputFilter from "../../../core/components/FormInputFilter";
import { ISelectOptions } from "../../../core/components/SelectInput";
import RepoModel from "../../../repositorios/application/data/RepoModel";
import RepoRepository from "../../../repositorios/repository/RepoRepository";
import ConsumidorModel from "../data/ConsumidorModel";

type IProps = {
  data: ConsumidorModel;
  onChange: (data: ConsumidorModel) => void;
};

const ConsumidorForm = ({ data, onChange }: IProps) => {
  const [state, setState] = useState<ConsumidorModel>(data);
  const repoRepository = useService<RepoRepository>("RepoRepository");
  const [repositories, setRepositories] = useState<ISelectOptions[]>([]);

  const handleChange = (e: any) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    repoRepository.getAll();
    var subscriber = repoRepository.data$.subscribe((items) => {
      setRepositories([
        { label: "", value: "" },
        ...items.map((item) => ({
          label: RepoModel.fromDomain(item).repository,
          value: RepoModel.fromDomain(item).id,
        })),
      ]);
    });
    return () => {
      subscriber.unsubscribe();
    };
  }, [repoRepository]);

  useEffect(() => {
    onChange && onChange(state);
  }, [onChange, state]);

  return (
    <div>
      <div className="row">
        <div className="col-4">
          <FormInput
            type="text"
            label="CNPJ"
            field="cnpj"
            value={state.cnpj}
            placeholder="00.000.000/0000-00"
            onChange={handleChange}
          />
        </div>
        <div className="col-8">
          <FormInput
            type="text"
            label="Razão Social"
            field="razaoSocial"
            value={state.razaoSocial}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-8">
          <FormInput
            type="text"
            label="Nome fantasia"
            field="nomeFantasia"
            value={state.nomeFantasia}
            onChange={handleChange}
          />
        </div>
        <div className="col-4">
          <FormInput
            type="text"
            label="Data cadastro"
            field="dataCadastro"
            value={state.dataCadastro}
            disabled
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ConsumidorForm;
