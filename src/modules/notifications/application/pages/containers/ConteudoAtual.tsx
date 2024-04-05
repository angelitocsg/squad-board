import { useEffect, useState } from "react";

interface IProps {
  valid_data: any;
  updateInputValue: (field: string, value: any) => void;
}

export const ConteudoAtual = ({ valid_data, updateInputValue }: IProps) => {
  const [hasMessage, setHasMessage] = useState(false);

  useEffect(() => {
    setHasMessage(
      Object.keys(valid_data).filter((f) => f !== "messages").length > 0,
    );
  }, [valid_data]);

  return (
    <>
      <h2 className="h5 mt-4 mb-3">Conteúdo atual</h2>
      <table className="table table-hover table-sm">
        <thead className="table-dark">
          <tr>
            <th>Chave</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody className="table-light">
          {hasMessage && (
            <>
              {Object.keys(valid_data)
                .filter((f) => f !== "messages")
                .map((k) => (
                  <tr key={k}>
                    <td>{k}</td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id={k}
                        name={k}
                        value={
                          typeof valid_data[k] === "string"
                            ? valid_data[k]
                            : JSON.stringify(valid_data[k])
                        }
                        onChange={(e) =>
                          updateInputValue(e.target.name, e.target.value)
                        }
                      />
                    </td>
                  </tr>
                ))}
            </>
          )}
        </tbody>
        {!hasMessage && (
          <tfoot className="p-1 pv-2">
            <tr>
              <td colSpan={2}>
                <span className="p-1 pv-2">Sem conteúdo prévio</span>
              </td>
            </tr>
          </tfoot>
        )}
      </table>
    </>
  );
};

export default ConteudoAtual;
