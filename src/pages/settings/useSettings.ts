import { useEffect, useState } from "react";
import { ISettings } from "../../models/ISettings";
import { SettingsService } from "../../services/SettingsService";

const useSettings = () => {
  const [settings, set_settings] = useState<ISettings>(
    SettingsService.getSettings()
  );

  const updateValue = (field: string, value: any) => {
    const tmp = {
      ...settings,
      initial: false,
      [field]: value,
    };
    set_settings(tmp);
  };

  useEffect(() => {
    if (!settings.initial)
      localStorage.setItem("settings_all", JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    document.title = "Configurações | Squad";
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { settings, updateValue };
};

export default useSettings;
