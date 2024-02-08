import { useEffect, useState } from "react";

import { useService } from "../../../../di/DecouplerContext";
import FormCheckBox from "../../../core/components/FormCheckBox";
import FormInput from "../../../core/components/FormInput";
import { ISelectOptions } from "../../../core/components/SelectInput";
import RepoModel from "../../../repositorios/application/data/RepoModel";
import RepoRepository from "../../../repositorios/repository/RepoRepository";
import AcessoModel from "../data/AcessoModel";
import ConsumidorModel from "../data/ConsumidorModel";
import ContatoModel from "../data/ContatoModel";

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

  const handleChangeAcesso = (e: any) => {
    setState({
      ...state,
      acessos:
        state.acessos.length === 0
          ? [
              {
                ...new AcessoModel(),
                [e.target.name]: e.target.value,
              },
            ]
          : state.acessos.map((x) => ({
              ...x,
              [e.target.name]: e.target.value,
            })),
    });
  };

  const handleChangeContato = (e: any) => {
    setState({
      ...state,
      contatos:
        state.contatos.length === 0
          ? [
              {
                ...new ContatoModel(),
                [e.target.name]: e.target.value,
              },
            ]
          : state.contatos.map((x) => ({
              ...x,
              [e.target.name]: e.target.value,
            })),
    });
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
      <div className="mb-3 d-flex gap-4">
        <FormCheckBox
          label="Acesso documentação API"
          field="acessoDocto"
          value={state.acessoDocto}
          onChange={handleChange}
        />
        <FormCheckBox
          label="Acesso via hierarquia"
          field="acessoViaHierarquia"
          value={state.acessoViaHierarquia}
          onChange={handleChange}
        />
      </div>

      <div className="h6">Acessos</div>
      <hr className="mt-0" />
      <div className="row">
        <div className="col">
          <FormInput
            type="text"
            label="API Key"
            field="apiKey"
            value={state.acessos[0].apiKey}
            onChange={handleChangeAcesso}
          />
        </div>
        <div className="col-2">
          <FormInput
            type="text"
            label="Sigla"
            field="sigla"
            value={state.acessos[0].sigla}
            onChange={handleChangeAcesso}
          />
        </div>
        <div className="col">
          <FormInput
            type="text"
            label="Escopos"
            field="escopos"
            value={state.acessos[0].escopos}
            onChange={handleChangeAcesso}
          />
        </div>
      </div>

      <div className="h6">Contatos</div>
      <hr className="mt-0" />
      <div className="row">
        <div className="col">
          <FormInput
            type="text"
            label="Nome"
            field="nome"
            value={state.contatos[0].nome}
            onChange={handleChangeContato}
          />
        </div>
        <div className="col">
          <FormInput
            type="text"
            label="Telefone"
            field="telefone"
            value={state.contatos[0].telefone}
            onChange={handleChangeContato}
          />
        </div>
        <div className="col">
          <FormInput
            type="email"
            label="E-mail"
            field="email"
            value={state.contatos[0].email}
            onChange={handleChangeContato}
          />
        </div>
      </div>
    </div>
  );
};

export default ConsumidorForm;
