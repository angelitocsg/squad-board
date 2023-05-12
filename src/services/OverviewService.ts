import { SEM_ALOCACAO } from "../constants/board.constants";
import { IMember, IOverview } from "../models/IOverview";
import { IImportService } from "../interfaces/IImportService";

export class OverviewService implements IImportService {
  updateOverviewMembers = (assigness: string[]) => {
    const current = localStorage.getItem("overview_members");
    if (current) return;
    console.log({ current });

    const members: IMember[] = assigness.map((a) => ({
      name:
        a === SEM_ALOCACAO ? a : `${a.split(" ")[0]} ${a.split(" ")[1][0]}.`,
      user: a === SEM_ALOCACAO ? a : `${a.split(" ")[0]}`,
    }));
    localStorage.setItem("overview_members", JSON.stringify(members));
  };

  clear() {
    localStorage.removeItem("overview_features");
    localStorage.removeItem("overview_members");
  }

  import(data: string) {
    let overviewData = JSON.parse(data) as IOverview;

    // localStorage.setItem("overview_data", JSON.stringify(overviewData));
    localStorage.setItem(
      "overview_features",
      JSON.stringify(overviewData.features)
    );
    localStorage.setItem(
      "overview_members",
      JSON.stringify(overviewData.members)
    );
    localStorage.setItem("overview_tasks", JSON.stringify(overviewData.tasks));
  }
}
