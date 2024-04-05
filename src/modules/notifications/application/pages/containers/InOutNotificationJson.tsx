import { useEffect, useState } from "react";

interface IProps {
  valid_data: any;
  set_valid_data: (value: any) => void;
}

const InOutNotificationJson = ({ valid_data, set_valid_data }: IProps) => {
  const [invalid_json, set_invalid_json] = useState<string | undefined>();
  const [input_data, set_input_data] = useState("{}");

  useEffect(() => {
    set_invalid_json(undefined);
    try {
      const jsonData = JSON.parse(input_data);
      set_valid_data({ messages: [], ...jsonData });
    } catch {
      set_invalid_json("Conteúdo do 'input-data' atual inválido!");
    }
  }, [input_data, set_valid_data]);

  return (
    <div className="row">
      <div className="col">
        <div className="mb-3">
          <label htmlFor="origem" className="form-label">
            Cole o conteúdo do <b>input-data</b> atual aqui:
          </label>
          <textarea
            style={{ fontFamily: "courier", fontSize: 12 }}
            className={`form-control ${invalid_json ? "is-invalid" : ""}`}
            id="origem"
            rows={8}
            value={input_data}
            onChange={(e) => set_input_data(e.target.value)}></textarea>
          <span className="text-danger">{invalid_json}</span>
        </div>
      </div>

      <div className="col">
        <div className="mb-3">
          <label htmlFor="origem" className="form-label">
            Conteúdo <b>input-data</b> atualizado:
          </label>
          <textarea
            style={{ fontFamily: "courier", fontSize: 12 }}
            readOnly
            className="form-control"
            id="destino"
            rows={8}
            value={JSON.stringify(valid_data)}></textarea>
        </div>
      </div>
    </div>
  );
};

export default InOutNotificationJson;
