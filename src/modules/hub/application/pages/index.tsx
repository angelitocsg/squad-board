import PageLayout from "../../../../shared/PageLayout";
import DisplayTable from "../../../core/components/DisplayTable";
import useController from "./useController";

const HubConsumidoresHome = () => {
  const { tActions, tColumns, tHeaderButtons, lines, handleEdit } =
    useController();

  return (
    <PageLayout title="Hub - Consumidores" full>
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

export default HubConsumidoresHome;
