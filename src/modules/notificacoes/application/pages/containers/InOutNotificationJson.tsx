import { useEffect, useState } from "react";

import { useService } from "../../../../../di/DecouplerContext";
import NotificacaoRepository from "../../../repository/NotificacaoRepository";
import InputDataModel from "../../data/InputDataModel";
import InputDataStore from "../../data/InputDataStore";
import NotificacaoModel from "../../data/NotificacaoModel";

const InOutNotificationJson = () => {
  const [invalid_json, set_invalid_json] = useState<string | undefined>();
  const [input_data, set_input_data] = useState(
    JSON.stringify({ usuario: "" }),
  );
  const [output_data, set_output_data] = useState("");
  const inputDataStore = useService<InputDataStore>("InputDataStore");
  const notificacaoRepository = useService<NotificacaoRepository>(
    "NotificacaoRepository",
  );

  useEffect(() => {
    set_invalid_json(undefined);
    try {
      const data = new InputDataModel(input_data);
      inputDataStore.updateCurrent(data);
      notificacaoRepository.clear();
      data.messages.forEach((msg) => {
        const entity = NotificacaoModel.toDomain(msg);
        notificacaoRepository.create(entity);
      });
    } catch {
      set_invalid_json("Conteúdo do 'input-data' atual inválido!");
    }
  }, [inputDataStore, input_data, notificacaoRepository]);

  useEffect(() => {
    var subscriber = inputDataStore.current$.subscribe((value) => {
      const content = {
        ...(value.content ?? {}),
        messages: value.messages,
      };
      set_output_data(JSON.stringify(content));
    });
    return () => {
      subscriber.unsubscribe();
    };
  }, [inputDataStore]);

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
            value={output_data}></textarea>
        </div>
      </div>
    </div>
  );
};

export default InOutNotificationJson;
