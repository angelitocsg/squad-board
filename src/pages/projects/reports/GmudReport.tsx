import PaneGmud from "../containers/PaneGmud";
import SummaryIndicators from "../containers/SummaryIndicators";
import useProject from "../useProject";

const GmudReport = () => {
  const { getGmudsSummary, getAllGmuds } = useProject();
  return (
    <div className="container-fluid pt-3 pb-2">
      <h1>GMUDs</h1>
      <SummaryIndicators indicators={getGmudsSummary()} titleHidden={true} />
      <PaneGmud
        gmuds={getAllGmuds()}
        segmentBy={"repositoryId"}
        onChangeValue={() => {}}
      />
    </div>
  );
};

export default GmudReport;
