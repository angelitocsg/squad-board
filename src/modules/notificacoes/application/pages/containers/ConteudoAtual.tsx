import { useEffect, useState } from "react";

import { useService } from "../../../../../di/DecouplerContext";
import InputDataModel from "../../data/InputDataModel";
import InputDataStore from "../../data/InputDataStore";

export const ConteudoAtual = () => {
  const [keys, setKeys] = useState<string[]>([]);
  const inputDataStore = useService<InputDataStore>("InputDataStore");
  const [inputData, setInputData] = useState<InputDataModel>(new InputDataModel("{}"));

  useEffect(() => {
    var subscriber = inputDataStore.current$.subscribe((value) => {
      setInputData(value ?? inputData);
      setKeys(Object.keys(value.content).filter((f) => f !== "messages"));
    });
    return () => {
      subscriber.unsubscribe();
    };
  }, [inputData, inputDataStore]);

  const handleChange = (e: any) => {
    inputDataStore.updateCurrent({
      ...inputData,
      content: {
        ...inputData.content,
        [e.target.name]: e.target.value,
      },
    });
  };

  return (
    <div className="card">
      <div className="card-body">
        <table className="table table-hover table-sm">
          <thead className="table-light">
            <tr>
              <th>Chave</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            {keys.map((k) => (
              <tr key={k}>
                <td>{k}</td>
                <td>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    name={k}
                    value={
                      typeof inputData.content[k] === "string"
                        ? inputData.content[k]
                        : JSON.stringify(inputData.content[k])
                    }
                    onChange={handleChange}
                  />
                </td>
              </tr>
            ))}
          </tbody>
          {!keys && (
            <tfoot className="p-1 pv-2">
              <tr>
                <td colSpan={2}>
                  <span className="p-1 pv-2">Sem conteúdo prévio</span>
                </td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    </div>
  );
};

export default ConteudoAtual;
