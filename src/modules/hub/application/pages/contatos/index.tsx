import PageLayout from "../../../../../shared/PageLayout";
import DisplayTable from "../../../../core/components/DisplayTable";
import useController from "./useController";

const HubContatosHome = () => {
  const { tActions, tColumns, tHeaderButtons, lines, handleEdit } =
    useController();

  return (
    <PageLayout title="Hub - Contatos" full>
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

export default HubContatosHome;
