import { useEffect, useState } from "react";

import { useService } from "../../di/DecouplerContext";
import { StorageKey } from "../../enums/StorageKey";
import { ISettings } from "../../models/ISettings";
import { BoardRepository } from "../../repository/BoardRepository";
import { SettingsService } from "../../services/SettingsService";

const useSettings = () => {
  const service = useService<SettingsService>("SettingsService");
  const boardRepository = useService<BoardRepository>("BoardRepository");
  const [settings, set_settings] = useState<ISettings>(service.getSettings());
  const [features, set_features] = useState<string>(settings.features);
  const [invalid_json, set_invalid_json] = useState<string | undefined>();
  const features_text = boardRepository.getFeaturesFromLocalStorage() ?? "";

  const updateValue = (field: string, value: any) => {
    const tmp = {
      ...settings,
      initial: false,
      [field]: value,
    };
    set_settings(tmp);

    if (field === "features") {
      try {
        let ft = tmp.features;
        ft = JSON.stringify(JSON.parse(ft), null, 2);
        set_features(ft);
        return;
      } catch {}
      set_features(settings.features);
    }
  };

  useEffect(() => {
    const idFeatures = document.getElementById("features");
    const height = idFeatures?.scrollHeight ?? 0;
    if (idFeatures) idFeatures.style.height = `${height + 2}px`;
  }, [features]);

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
  }, [settings]);

  useEffect(() => {
    document.title = "Configurações | Squad";
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { features, features_text, invalid_json, settings, updateValue };
};

export default useSettings;
