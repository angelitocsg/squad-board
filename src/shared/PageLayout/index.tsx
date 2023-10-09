import { StorageKey } from "../../enums/StorageKey";
import ExportHelper from "../../helpers/export.helper";
import AlertModal from "../../modules/core/components/AlertModal";
import AppModal from "../../modules/core/components/AppModal";
import FloatingButtonMenu from "../../modules/core/components/FloatingButtonMenu";
import FormImport from "../../modules/core/components/FormImport";

type IProps = {
  title?: string;
  children: any;
};

const floatingButtons = [
  {
    title: "Importar",
    icon: "bi-upload",
    position: { fontSize: "1.3em" },
    onClick: () => {
      const fileInput = document.getElementById("fileInput") as HTMLInputElement;
      fileInput?.click();
      fileInput?.addEventListener("change", handleFiles, false);
      function handleFiles() {
        if (!fileInput.files || !fileInput.files[0]) return;
        const file = fileInput.files[0];
        const reader = new FileReader();
        const encodingFromSettings =
          localStorage.getItem("encoding") ?? "UTF-8" ?? "iso-8859-1" ?? "windows-1252";
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
    },
  },
  {
    title: "Exportar",
    icon: "bi-download",
    position: { fontSize: "1.3em" },
    onClick: () => {
      let data = {
        [StorageKey.DATA_GESTAO_MUDANCA]: JSON.parse(
          localStorage.getItem(StorageKey.DATA_GESTAO_MUDANCA) ?? "{}",
        ),
        [StorageKey.DATA_PROD_DIGITAL]: JSON.parse(
          localStorage.getItem(StorageKey.DATA_PROD_DIGITAL) ?? "{}",
        ),
        [StorageKey.DATA_REPOSITORIOS]: JSON.parse(
          localStorage.getItem(StorageKey.DATA_REPOSITORIOS) ?? "{}",
        ),
      };
      let dt = new Date().toISOString();
      dt = dt.replace(/-/g, "").replace(/:/g, "").substring(0, 13);
      ExportHelper.jsonFile(data, `backup_${dt}`);
    },
  },
];

const PageLayout = ({ title, children }: IProps) => {
  return (
    <>
      <section className="container mt-4">
        <h1 className="h4 mb-3">{title}</h1>
        {children}
      </section>
      <AppModal />
      <AlertModal />
      <FloatingButtonMenu buttons={floatingButtons} />
      <FormImport />
    </>
  );
};

export default PageLayout;
