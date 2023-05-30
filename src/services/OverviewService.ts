import { SEM_ALOCACAO } from "../constants/board.constants";
import { StorageKey } from "../enums/StorageKey";
import { IImportService } from "../interfaces/IImportService";
import { IMember, IOverview } from "../models/IOverview";

export class OverviewService implements IImportService {
  updateOverviewMembers = (assigness: string[]) => {
    const current = localStorage.getItem(StorageKey.OVERVIEW_MEMBERS);
    if (current) return;

    const members: IMember[] = assigness.map((a) => ({
      name:
        a === SEM_ALOCACAO ? a : `${a.split(" ")[0]} ${a.split(" ")[1][0]}.`,
      user: a === SEM_ALOCACAO ? a : `${a.split(" ")[0]}`,
    }));
    localStorage.setItem(StorageKey.OVERVIEW_MEMBERS, JSON.stringify(members));
  };

  clear() {
    localStorage.removeItem(StorageKey.OVERVIEW_FEATURES);
    localStorage.removeItem(StorageKey.OVERVIEW_TASKS);
  }

  import(data: string) {
    let overviewData = JSON.parse(data) as IOverview;

    // localStorage.setItem("overview_data", JSON.stringify(overviewData));
    localStorage.setItem(
      StorageKey.OVERVIEW_FEATURES,
      JSON.stringify(overviewData.features)
    );
    localStorage.setItem(
      StorageKey.OVERVIEW_MEMBERS,
      JSON.stringify(overviewData.members)
    );
    localStorage.setItem(
      StorageKey.OVERVIEW_TASKS,
      JSON.stringify(overviewData.tasks)
    );
  }
}
