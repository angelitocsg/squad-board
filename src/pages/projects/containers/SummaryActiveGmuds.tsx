import { IProjectGmud } from "../../../models/IProjectGmud";
import PaneGmud from "./PaneGmud";

interface IProps {
  gmuds: IProjectGmud[];
}

const SummaryActiveGmuds = ({ gmuds }: IProps) => {
  return gmuds && gmuds.length > 0 ? (
    <>
      <h1 className="h4 pb-2">GMUDs ativas / previsão de publicação</h1>
      <div className="border bg-white p-3 mb-5">
        <PaneGmud gmuds={gmuds} onChangeValue={() => {}} segmentEnabled={false} />
      </div>
    </>
  ) : (
    <></>
  );
};

export default SummaryActiveGmuds;
