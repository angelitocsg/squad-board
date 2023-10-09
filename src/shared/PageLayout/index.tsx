import AlertModal from "../../modules/core/components/AlertModal";
import AppModal from "../../modules/core/components/AppModal";
import FloatingButtonMenu from "../../modules/core/components/FloatingButtonMenu";
import FormImport from "../../modules/core/components/FormImport";
import { BackupService } from "../../services/BackupService";

type IProps = {
  title?: string;
  full?: boolean;
  children: any;
};

const floatingButtons = [
  {
    title: "Importar",
    icon: "bi-upload",
    position: { fontSize: "1.3em" },
    onClick: BackupService.importBackup,
  },
  {
    title: "Exportar",
    icon: "bi-download",
    position: { fontSize: "1.3em" },
    onClick: BackupService.exportBackup,
  },
];

const PageLayout = ({ title, full, children }: IProps) => {
  const fullClass = `${full ? "container-fluid" : "container"} mt-4`;
  return (
    <>
      <section className={fullClass}>
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
