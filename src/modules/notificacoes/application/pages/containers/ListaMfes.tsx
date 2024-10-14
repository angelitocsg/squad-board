import { useEffect, useRef, useState } from "react";

import { useService } from "../../../../../di/DecouplerContext";
import { StorageKey } from "../../../../../enums/StorageKey";
import { BackupService } from "../../../../../services/BackupService";
import DynamicTable, {
  IActions,
  IColumns,
} from "../../../../core/components/DynamicTable";
import { IHeaderActions } from "../../../../core/components/DynamicTable/headerActions";
import ListaMfeRepository from "../../../repository/ListaMfeRepository";
import MfeDTO from "../../../repository/MfeDTO";
import { vv_mf } from "../../data/SelectOptions";

const ListaMfes = () => {
  const listaMfeRepository =
    useService<ListaMfeRepository>("ListaMfeRepository");
  const [lines, setLines] = useState<MfeDTO[]>([]);
  const [emptyLine, setEmptyLine] = useState<MfeDTO>(new MfeDTO());

  const tColumns: IColumns[] = [
    { field: "label", title: "Nome MFE" },
    { field: "value", title: "Tag html" },
  ];

  useEffect(() => {
    listaMfeRepository.getAll();
    var subscriber = listaMfeRepository.data$.subscribe((items) => {
      last.current = items.filter((x) => x.label && x.value);
      const newEmpty = new MfeDTO();
      setEmptyLine(newEmpty);
      if (items.length === 0) {
        setLines([
          ...vv_mf.map((item) => new MfeDTO(null, item.label, item.value)),
          newEmpty,
        ]);
        return;
      }
      setLines([
        ...items.map((item) => ({
          ...item,
        })),
        newEmpty,
      ]);
    });
    return () => {
      subscriber.unsubscribe();
    };
  }, [listaMfeRepository]);

  const handleFieldChange = (line: MfeDTO, field: any, value: any) => {
    const linesUpdated = lines.map((curLine) =>
      curLine.id === line.id ? { ...curLine, [field]: value } : curLine,
    );
    if (line.id === emptyLine.id) {
      const newEmpty = new MfeDTO();
      setEmptyLine(newEmpty);
      linesUpdated.push(newEmpty);
    }
    setLines(linesUpdated);
  };

  const handleDelete = (line: MfeDTO) => {
    if (window.confirm("Excluir item?"))
      setLines(lines.filter((x) => x.id !== line.id));
  };

  const handleImport = () => {
    BackupService.importCsvToData(StorageKey.DATA_NOTIFICACOES_CONFIG);
  };

  const handleExport = () => {
    BackupService.exportDataAsCsv(
      listaMfeRepository.export(),
      StorageKey.DATA_NOTIFICACOES_CONFIG,
    );
  };

  const tActions: IActions[] = [
    {
      label: "excluir",
      onClick: handleDelete,
    },
  ];

  const tHeaderButtons: IHeaderActions = {
    buttonImport: {
      label: "Importar",
      action: handleImport,
    },
    buttonExport: {
      label: "Exportar",
      action: handleExport,
    },
  };

  const interval = useRef<any>(0);
  const last = useRef<any>(lines);

  useEffect(() => {
    const validLines = lines.filter((x) => x.label && x.value);
    if (JSON.stringify(last.current) === JSON.stringify(validLines)) {
      return;
    }
    last.current = validLines;
    clearInterval(interval.current);
    interval.current = setInterval(() => {
      listaMfeRepository.update(lines.filter((x) => x.label && x.value));
      console.log("lista de mfes atualizada");
      clearInterval(interval.current);
    }, 1000);
  }, [lines, listaMfeRepository]);

  return (
    <>
      <p>
        Microfrontends que aparecem na lista de seleção ao cadastrar uma
        notificação
      </p>
      <DynamicTable
        actions={tActions}
        columns={tColumns}
        headerButtons={tHeaderButtons}
        lines={lines}
        onFieldChange={handleFieldChange}
      />
    </>
  );
};

export default ListaMfes;
