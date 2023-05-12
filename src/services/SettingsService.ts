import { IExportService } from "../interfaces/IExportService";
import { IImportService } from "../interfaces/IImportService";
import { ISettings } from "../models/ISettings";

export class SettingsService implements IImportService, IExportService {
  initialState: ISettings = {
    initial: true,
    board_source: "",
  };

  clear() {
    localStorage.removeItem("settings_all");
  }

  import() {}

  export() {}

  getSettings(): ISettings {
    let ls =
      localStorage.getItem("settings_all") ?? JSON.stringify(this.initialState);
    return JSON.parse(ls);
  }
}
