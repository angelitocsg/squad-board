import PaneGmud from "../containers/PaneGmud";
import SummaryIndicators from "../containers/SummaryIndicators";
import useProject from "../useProject";

const GmudReport = () => {
  const { summary_indicators, getAllGmuds } = useProject();
  return (
    <div className="container-fluid pt-3 pb-2">
      <h1>GMUDs</h1>
      <SummaryIndicators indicators={summary_indicators} titleHidden={true} />
      <PaneGmud
        gmuds={getAllGmuds()}
        segmentBy={"repositoryId"}
        onChangeValue={() => {}}
      />
    </div>
  );
};

export default GmudReport;
