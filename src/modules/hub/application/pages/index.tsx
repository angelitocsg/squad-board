import PageLayout from "../../../../shared/PageLayout";
import DisplayTable from "../../../core/components/DisplayTable";
import useController from "./useController";

const AcessosHubHome = () => {
  const { tActions, tColumns, tHeaderButtons, lines, handleEdit } =
    useController();

  return (
    <PageLayout title="Acessos Hub" full>
      <DisplayTable
        actions={tActions}
        columns={tColumns}
        headerButtons={tHeaderButtons}
        lines={lines}
        onLineClick={handleEdit}
      />
    </PageLayout>
  );
};

export default AcessosHubHome;
