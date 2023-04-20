import PaneGmud from "../containers/PaneGmud";
import useProject from "../useProject";

const GmudReport = () => {
  const { getAllGmuds } = useProject();
  return (
    <div className="container-fluid pt-3 pb-2">
      <h1>GMUDs</h1>
      <PaneGmud
        gmuds={getAllGmuds()}
        segmentBy={"repositoryId"}
        onChangeValue={() => {}}
      />
    </div>
  );
};

export default GmudReport;
