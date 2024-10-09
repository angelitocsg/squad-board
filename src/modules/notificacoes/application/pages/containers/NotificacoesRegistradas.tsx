import DisplayTable from "../../../../core/components/DisplayTable";
import useController from "../useController";

const NotificacoesRegistradas = () => {
  const { tActions, tColumns, tHeaderButtons, lines, handleEdit } =
    useController();

  return (
    <DisplayTable
      actions={tActions}
      columns={tColumns}
      headerButtons={tHeaderButtons}
      lines={lines}
      onLineClick={handleEdit}
    />
  );
};

export default NotificacoesRegistradas;
