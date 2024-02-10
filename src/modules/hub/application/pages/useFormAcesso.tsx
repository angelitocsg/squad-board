import { useEffect, useState } from "react";

import { useService } from "../../../../di/DecouplerContext";
import { IActions, IColumns } from "../../../core/components/DynamicTable";
import { IHeaderActions } from "../../../core/components/DynamicTable/headerActions";
import AcessoModel from "../data/AcessoModel";
import ConsumidorModel from "../data/ConsumidorModel";
import ConsumidorStore from "../data/ConsumidorStore";

type IProps = {
  data: ConsumidorModel;
  onChange: (data: ConsumidorModel) => void;
};

const useFormAcesso = ({ data, onChange }: IProps) => {
  const [lines, setLines] = useState<AcessoModel[]>(data.acessos);
  const service = useService<ConsumidorStore>("ConsumidorStore");

  const handleAdd = () => {
    setLines([...lines, new AcessoModel()]);
  };

  const handleDelete = (item: AcessoModel) => {
    setLines(lines.filter((x) => x.id === item.id));
  };

  const handleChangeLine = (line: any, field: any, value: any) => {
    setLines(
      lines.map((item) =>
        item.id === line.id ? { ...item, [field]: value } : item,
      ),
    );
  };

  const tActions: IActions[] = [
    {
      label: "excluir",
      onClick: handleDelete,
    },
  ];

  const tColumns: IColumns[] = [
    { field: "apiKey", title: "API Key", required: true },
    { field: "sigla", title: "Sigla", required: true, width: 80 },
    { field: "escopos", title: "Escopos", required: true },
  ];

  const tHeaderButtons: IHeaderActions = {
    buttonSave: {
      label: "Adicionar",
      action: handleAdd,
    },
  };

  useEffect(() => {
    onChange &&
      onChange({
        ...service.current,
        acessos: lines,
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onChange, lines]);

  return {
    tActions,
    tColumns,
    tHeaderButtons,
    lines,
    handleChangeLine,
  };
};

export default useFormAcesso;
