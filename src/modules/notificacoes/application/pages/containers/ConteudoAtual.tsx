import { useEffect, useState } from "react";

import { useService } from "../../../../../di/DecouplerContext";
import DynamicTable, {
  IActions,
  IColumns,
} from "../../../../core/components/DynamicTable";
import KeyValueDTO from "../../../repository/KeyValueDTO";
import InputDataModel from "../../data/InputDataModel";
import InputDataStore from "../../data/InputDataStore";

export const ConteudoAtual = () => {
  const [lines, setLines] = useState<KeyValueDTO[]>([]);
  const inputDataStore = useService<InputDataStore>("InputDataStore");
  const [inputData, setInputData] = useState<InputDataModel>(
    new InputDataModel("{}"),
  );

  const tColumns: IColumns[] = [
    { field: "key", title: "Chave" },
    { field: "value", title: "Valor" },
  ];

  const handleDelete = (line: KeyValueDTO) => {
    if (window.confirm("Excluir item?")) {
      const linesUpdated = lines.filter((x) => x.id !== line.id);
      setLines(linesUpdated);
      updateStore(linesUpdated);
    }
  };

  const tActions: IActions[] = [
    {
      label: "excluir",
      onClick: handleDelete,
    },
  ];

  useEffect(() => {
    const subscriber = inputDataStore.current$.subscribe((value) => {
      setInputData(value ?? inputData);
      const keys = Object.keys(value.content).filter((f) => f !== "messages");
      const newEmpty = new KeyValueDTO();
      setLines([
        ...keys.map(
          (k) =>
            new KeyValueDTO(null, k, (inputData.content[k] as string) ?? ""),
        ),
        newEmpty,
      ]);
      if (keys.length === 0) setLines([newEmpty]);
    });
    return () => {
      subscriber.unsubscribe();
    };
  }, [inputData, inputDataStore]);

  const handleFieldChange = (line: KeyValueDTO, field: any, value: any) => {
    const linesUpdated = lines.map((curLine) =>
      curLine.id === line.id ? { ...curLine, [field]: value } : curLine,
    );
    setLines(linesUpdated);
    updateStore(linesUpdated);
  };

  const updateStore = (linesUpdated: KeyValueDTO[]) => {
    inputDataStore.updateCurrent({
      ...inputData,
      content: linesUpdated
        .filter((c) => c.key)
        .reduce((p, c) => {
          return { ...p, [c.key]: c.value };
        }, {}),
    });
  };

  return (
    <>
      <p>
        Lista de chave e valor utilizados no campo input-data do Quickspark.
      </p>
      <DynamicTable
        actions={tActions}
        columns={tColumns}
        lines={lines}
        onFieldChange={handleFieldChange}
      />
    </>
  );
};

export default ConteudoAtual;
