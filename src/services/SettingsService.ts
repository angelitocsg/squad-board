import { ISettings } from "../models/ISettings";

export class SettingsService {
  static initialState: ISettings = {
    initial: true,
    board_source: "",
  };

  static getSettings(): ISettings {
    let ls =
      localStorage.getItem("settings_all") ?? JSON.stringify(this.initialState);
    return JSON.parse(ls);
  }
}
