import { StorageKey } from "../enums/StorageKey";
import { IExportService } from "../interfaces/IExportService";
import { IImportService } from "../interfaces/IImportService";
import { IFeatureLabel, ISettings } from "../models/ISettings";

export class SettingsService implements IImportService, IExportService {
  initialState: ISettings = {
    initial: true,
    board_source: "",
    board_external_search: "",
    features: "[]",
  };

  clear() {
    localStorage.removeItem(StorageKey.SETTINGS_ALL);
  }

  import() {}

  export() {}

  getSettings(): ISettings {
    let ls =
      localStorage.getItem(StorageKey.SETTINGS_ALL) ??
      JSON.stringify(this.initialState);
    return JSON.parse(ls);
  }

  get board_external_search(): string {
    return this.getSettings().board_external_search;
  }

  getFeatureLabel(feature_id: string) {
    let features: IFeatureLabel[] = [];
    try {
      features = JSON.parse(this.getSettings().features);
    } catch {
      features = [];
    }
    return features?.find((f) => f.id === feature_id)?.label ?? feature_id;
  }
}
