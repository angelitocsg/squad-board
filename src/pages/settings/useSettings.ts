import { useEffect, useState } from "react";
import { ISettings } from "../../models/ISettings";
import { SettingsService } from "../../services/SettingsService";
import { useService } from "../../di/DecouplerContext";

const useSettings = () => {
  const service = useService<SettingsService>("SettingsService");

  const [settings, set_settings] = useState<ISettings>(service.getSettings());

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
