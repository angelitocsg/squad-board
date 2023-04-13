import { IProjectGmud } from "../../../models/IProjectGmud";
import PaneGmud from "./PaneGmud";

interface IProps {
  gmuds: IProjectGmud[];
}

const SummaryActiveGmuds = ({ gmuds }: IProps) => {
  return gmuds ? (
    <>
      <h1 className="h4 pb-2">GMUDs ativas</h1>
      <div className="border bg-white p-3 mb-5">
        <PaneGmud gmuds={gmuds} onChangeValue={() => {}} />
      </div>
    </>
  ) : (
    <></>
  );
};

export default SummaryActiveGmuds;
