const jsonFile = (exportData: any, fileName: string) => {
  const dataStr =
    "data:text/json;charset=utf-8," +
    encodeURIComponent(JSON.stringify(exportData));
  const dlAnchorElem = document.createElement("a");
  dlAnchorElem?.setAttribute("href", dataStr);
  dlAnchorElem?.setAttribute("download", `${fileName}_${Date.now()}.json`);
  dlAnchorElem?.click();
  dlAnchorElem?.remove();
};

const csvFile = (exportData: any, fileName: string) => {
  const dataStr =
    "data:text/csv;charset=utf-8," + encodeURIComponent(exportData);
  const dlAnchorElem = document.createElement("a");
  dlAnchorElem?.setAttribute("href", dataStr);
  dlAnchorElem?.setAttribute("download", `${fileName}_${Date.now()}.csv`);
  dlAnchorElem?.click();
  dlAnchorElem?.remove();
};

const ExportHelper = { jsonFile, csvFile };

export default ExportHelper;
