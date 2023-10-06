import { useEffect, useState } from "react";
import FormInput from "../../../core/components/FormInput";
import GmudModel from "../data/GmudModel";

type IProps = {
  data: GmudModel;
  onChange: (data: GmudModel) => void;
};

const GmudForm = ({ data, onChange }: IProps) => {
  const [state, setState] = useState<GmudModel>(data);

  const handleChange = (e: any) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleOpenLink = () =>
    state.link.startsWith("http") && window.open(state.link, "_blank");

  useEffect(() => {
    onChange && onChange(state);
  }, [onChange, state]);

  return (
    <div>
      <div className="row">
        <div className="col-7">
          <FormInput
            type="text"
            label="Repositório"
            field="repositoryId"
            value={state.repositoryId}
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
