import { useEffect, useState } from "react";

import { useService } from "../../di/DecouplerContext";
import { StorageKey } from "../../enums/StorageKey";
import { ISettings } from "../../models/ISettings";
import { SettingsService } from "../../services/SettingsService";

const useSettings = () => {
  const service = useService<SettingsService>("SettingsService");
  const [features, set_features] = useState<string>("");
  const [invalid_json, set_invalid_json] = useState<string | undefined>();
  const [settings, set_settings] = useState<ISettings>(service.getSettings());

  const updateValue = (field: string, value: any) => {
    const tmp = {
      ...settings,
      initial: false,
      [field]: value,
    };
    set_settings(tmp);

    // if (field === "features") {
    //   set_features(value);
    // }
  };

  useEffect(() => {
    set_invalid_json(undefined);
    try {
      JSON.parse(features);
    } catch {
      set_invalid_json("Conteúdo 'features' atual inválido!");
    }
  }, [features]);

  useEffect(() => {
    if (!settings.initial)
      localStorage.setItem(StorageKey.SETTINGS_ALL, JSON.stringify(settings));
    set_features(settings.features);
  }, [settings]);

  useEffect(() => {
    document.title = "Configurações | Squad";
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { invalid_json, settings, updateValue };
};

export default useSettings;
