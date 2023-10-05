import AlertModal from "../../modules/core/components/AlertModal";
import AppModal from "../../modules/core/components/AppModal";

type IProps = {
  title?: string;
  children: any;
};

const PageLayout = ({ title, children }: IProps) => {
  return (
    <>
      <section className="container mt-4">
        <h1 className="h4 mb-3">{title}</h1>
        {children}
      </section>
      <AppModal />
      <AlertModal />
    </>
  );
};

export default PageLayout;
