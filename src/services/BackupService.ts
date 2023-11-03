import Papa from "papaparse";

import ExportHelper from "../helpers/export.helper";

export class BackupService {
  static importBackup() {
    const fileInput = document.getElementById("fileInput") as HTMLInputElement;
    fileInput.accept = "application/json";
    fileInput?.click();
    fileInput?.addEventListener("change", handleFiles, false);
    function handleFiles() {
      if (!fileInput.files || !fileInput.files[0]) return;
      const file = fileInput.files[0];
      const reader = new FileReader();
      const encodingFromSettings = localStorage.getItem("encoding") ?? "UTF-8" ?? "iso-8859-1" ?? "windows-1252";
      reader.onabort = () => console.error("file reading was aborted");
      reader.onerror = () => console.error("file reading has failed");
      reader.onload = () => {
        const data = JSON.parse((reader.result as string) ?? "[]");
        const keys = Object.keys(data);
        keys.forEach(key => localStorage.setItem(key, JSON.stringify(data[key])));
      };
      console.info("Reader encoding:", encodingFromSettings);
      reader.readAsText(file, encodingFromSettings);
    }
  }

  static exportBackup() {
    const backupKeys = [];
    let data = {};
    for (let key in localStorage) {
      if (!key.startsWith("data_")) continue;
      backupKeys.push(key);
      data = { ...data, [key]: JSON.parse(localStorage.getItem(key) ?? "{}") };
    }
    let dt = new Date().toISOString();
    dt = dt.replace(/-/g, "").replace(/:/g, "").substring(0, 13);
    ExportHelper.jsonFile(data, `backup_${dt}`);
  }

  static exportDataAsCsv(data: any[]) {
    if (!data || data.length === 0) return;

    const columns = Object.keys(data[0]);
    const content =
      `${columns.join(";")}\n` +
      data.map(line => `${columns.map(col => line[col].replace(/\t/g, "")).join(";")}\n`).join("");

    let dt = new Date().toISOString();
    dt = dt.replace(/-/g, "").replace(/:/g, "").substring(0, 13);
    ExportHelper.csvFile(content, `data_${dt}`);
  }

  static importCsvToData(key: string) {
    const fileInput = document.getElementById("fileInput") as HTMLInputElement;
    fileInput.accept = "text/csv";
    fileInput?.addEventListener("change", handleFiles, false);
    fileInput?.click();
    function handleFiles() {
      if (!fileInput.files || !fileInput.files[0]) return;
      const file = fileInput.files[0];
      const reader = new FileReader();
      const encodingFromSettings = localStorage.getItem("encoding") ?? "UTF-8" ?? "iso-8859-1" ?? "windows-1252";
      reader.onabort = () => console.error("file reading was aborted");
      reader.onerror = () => console.error("file reading has failed");
      reader.onload = () => {
        const data = (reader.result as string) ?? "";
        const parsedCsv = Papa.parse(data);
        let columns = parsedCsv.data.shift() as string[];
        const lines = parsedCsv.data as [];
        const dtos = lines
          .map(line => {
            const it: any = {};
            columns.forEach((col, i) => {
              it[col] = line[i];
            });
            return it;
          })
          .filter(x => x.id);
        localStorage.setItem(key, JSON.stringify(dtos));
        fileInput?.removeEventListener("change", handleFiles, false);
        setTimeout(() => {
          window.location.reload();
        }, 200);
      };

      console.info("Reader encoding:", encodingFromSettings);
      reader.readAsText(file, encodingFromSettings);
    }
  }
}
