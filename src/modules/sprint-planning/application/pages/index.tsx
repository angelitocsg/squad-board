import PageLayout from "../../../../shared/PageLayout";
import DynamicTable from "../../../core/components/DynamicTable";
import useController from "./useController";

const SprintPlanningHome = () => {
  const { tActions, tColumns, tHeaderButtons, lines, handleFieldChange } = useController();

  return (
    <PageLayout title="Planejamento de sprint" full>
      <DynamicTable
        actions={tActions}
        columns={tColumns}
        headerButtons={tHeaderButtons}
        lines={lines}
        onFieldChange={handleFieldChange}
      />
    </PageLayout>
  );
};

export default SprintPlanningHome;
