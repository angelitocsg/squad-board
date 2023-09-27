import { useEffect, useState } from "react";
import FormInput from "../components/FormInput";
import GmudModel from "../viewModel/GmudModel";

type IProps = {
  data: GmudModel;
  onChange: (data: GmudModel) => void;
};

const GmudCreatePage = ({ data, onChange }: IProps) => {
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
        <div className="col-10">
          <FormInput
            type="text"
            label="Repositório"
            field="repositoryId"
            defaultValue={state.repositoryId}
            disabled
            readOnly
          />
        </div>
        <div className="col">
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
        <div className="col-4">
          <FormInput
            type="text"
            label="História"
            field="story"
            value={state.story}
            onChange={handleChange}
          />
        </div>
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
    </div>
  );
};

export default GmudCreatePage;
