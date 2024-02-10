import { useEffect, useState } from "react";

import { useService } from "../../../../di/DecouplerContext";
import { IActions, IColumns } from "../../../core/components/DynamicTable";
import { IHeaderActions } from "../../../core/components/DynamicTable/headerActions";
import ConsumidorModel from "../data/ConsumidorModel";
import ConsumidorStore from "../data/ConsumidorStore";
import ContatoModel from "../data/ContatoModel";

type IProps = {
  data: ConsumidorModel;
  onChange: (data: ConsumidorModel) => void;
};

const useFormContato = ({ data, onChange }: IProps) => {
  const [lines, setLines] = useState<ContatoModel[]>(data.contatos);
  const service = useService<ConsumidorStore>("ConsumidorStore");

  const handleAdd = () => {
    setLines([...lines, new ContatoModel()]);
  };

  const handleDelete = (item: ContatoModel) => {
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
    { field: "nome", title: "Nome", required: true },
    { field: "telefone", title: "Telefone", required: true, width: 200 },
    { field: "email", title: "E-mail", required: true },
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
        contatos: lines,
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

export default useFormContato;
