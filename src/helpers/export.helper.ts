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

const ExportHelper = { jsonFile };

export default ExportHelper;
