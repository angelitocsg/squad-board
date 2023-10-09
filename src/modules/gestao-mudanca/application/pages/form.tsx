import { useEffect, useState } from "react";

import { useService } from "../../../../di/DecouplerContext";
import FormInput from "../../../core/components/FormInput";
import FormInputFilter from "../../../core/components/FormInputFilter";
import { ISelectOptions } from "../../../core/components/SelectInput";
import RepoModel from "../../../repositorios/application/data/RepoModel";
import RepoRepository from "../../../repositorios/repository/RepoRepository";
import GmudModel from "../data/GmudModel";

type IProps = {
  data: GmudModel;
  onChange: (data: GmudModel) => void;
};

const GmudForm = ({ data, onChange }: IProps) => {
  const [state, setState] = useState<GmudModel>(data);
  const repoRepository = useService<RepoRepository>("RepoRepository");
  const [repositories, setRepositories] = useState<ISelectOptions[]>([]);

  const handleChange = (e: any) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleOpenLink = () => state.link.startsWith("http") && window.open(state.link, "_blank");

  useEffect(() => {
    repoRepository.getAll();
    var subscriber = repoRepository.data$.subscribe(items => {
      setRepositories([
        { label: "", value: "" },
        ...items.map(item => ({
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

  const getRepositoryValue = () => {
    const _default = { label: "", value: "" };
    if (repositories.length === 0) return _default;
    const product = repositories.find(p => p.value === state.repositoryId);
    return product ?? _default;
  };

  return (
    <div>
      <div className="row">
        <div className="col-7">
          <FormInputFilter
            label="Repositório"
            field="repositoryId"
            placeholder="Digite o nome do repositório"
            value={getRepositoryValue()}
            options={repositories}
            onChange={handleChange}
          />
        </div>
        <div className="col">
          <FormInput
            type="text"
            label="História"
            field="story"
            value={state.story}
            onChange={handleChange}
          />
        </div>
        <div className="col-2">
          <FormInput
            type="text"
            label="Versão"
            field="version"
            value={state.version}
            placeholder="0.0.0"
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-3">
          <FormInput
            type="text"
            label="Número"
            field="number"
            value={state.number}
            placeholder="CHG0000000"
            onChange={handleChange}
          />
        </div>
        <div className="col-3">
          <FormInput
            type="date"
            label="Data"
            field="date"
            value={state.date}
            onChange={handleChange}
          />
        </div>
        <div className="col-2">
          <FormInput
            type="text"
            label="Hora"
            field="time"
            value={state.time}
            placeholder="00h00"
            onChange={handleChange}
          />
        </div>
        <div className="col">
          <FormInput
            type="text"
            label="Responsável"
            field="owner"
            value={state.owner}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <FormInput
            type="text"
            label="Status"
            field="status"
            defaultValue={state.status}
            disabled
            readOnly
          />
        </div>
        <div className="col-8">
          <FormInput
            type="text"
            label="Link gmud"
            field="link"
            value={state.link}
            onChange={handleChange}
            rightButton={{
              id: "open_gmud_link",
              label: "abrir",
              onClick: handleOpenLink,
            }}
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
            onTextAreaChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default GmudForm;
