import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <section className="container mt-4">
      <div className="row row-cols-1 row-cols-md-3 mb-3 text-center">
        <div className="col">
          <div className="card mb-4 shadow-sm">
            <Link to="/board" className="nav-link">
              <div className="card-header">Painel Tarefas</div>
              <div className="card-body btn-link">Acessar</div>
            </Link>
          </div>
        </div>
        <div className="col">
          <div className="card mb-4 shadow-sm">
            <Link to="/projects" className="nav-link">
              <div className="card-header">Aplicações</div>
              <div className="card-body btn-link">Acessar</div>
            </Link>
          </div>
        </div>
        <div className="col">
          <div className="card mb-4 shadow-sm">
            <Link to="/notifications" className="nav-link">
              <div className="card-header">Notificações</div>
              <div className="card-body btn-link">Acessar</div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
