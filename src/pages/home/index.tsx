import { useNavigate } from "react-router-dom";

import PageLayout from "../../shared/PageLayout";

type IHomeItem = {
  title: string;
  route: string;
};
const HomeItem = ({ title, route }: IHomeItem) => {
  const navigate = useNavigate();

  const handleItemClick = () => {
    navigate(route);
  };

  return (
    <div
      className="card d-flex justify-content-center align-items-center"
      role="button"
      onClick={handleItemClick}
      style={{ minWidth: "180px" }}>
      <div className="card-body p-2 d-flex flex-column justify-content-center align-items-center">
        <span className="bi bi-columns-gap px-4 py-2" style={{ fontSize: "2.5em" }} />
        <span className="h5">{title}</span>
      </div>
    </div>
  );
};

const HomePage = () => {
  return (
    <PageLayout title="Squad">
      <div className="d-flex justify-content-start flex-wrap gap-2">
        <HomeItem title="Produtos" route="/paineis/produtos" />
        <HomeItem title="Tarefas" route="/paineis/tarefas" />
        <HomeItem title="Planejamento" route="/sprint-planning" />
        <HomeItem title="Aplicações" route="/projects" />
        <HomeItem title="GMUDs" route="/cadastros/gestao-mudanca" />
      </div>
    </PageLayout>
  );
};

export default HomePage;
