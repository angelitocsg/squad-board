import { Link, useLocation } from "react-router-dom";

const NavCadastros = () => {
  return (
    <li className="nav-item dropdown">
      <span
        className="nav-link dropdown-toggle"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false">
        Cadastros
      </span>
      <ul className="dropdown-menu">
        <li>
          <Link to="/cadastros/produto-digital" className="dropdown-item">
            Produtos digitais
          </Link>
        </li>
        <li>
          <Link to="/cadastros/repositorios" className="dropdown-item">
            Repositórios
          </Link>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>
        <li className="nav-item">
          <Link to="/cadastros/gestao-mudancao" className="dropdown-item">
            Gestão de mudanças
          </Link>
        </li>
      </ul>
    </li>
  );
};

const NavUtils = () => {
  return (
    <li className="nav-item dropdown">
      <span
        className="nav-link dropdown-toggle"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false">
        Utilitários
      </span>
      <ul className="dropdown-menu">
        <li>
          <Link to="/notifications" className="dropdown-item">
            Notificações
          </Link>
        </li>
        <li>
          <Link to="/faq-editor" className="dropdown-item">
            Editor FAQ
          </Link>
        </li>
      </ul>
    </li>
  );
};

const Navbar = () => {
  const location = useLocation();

  const getActiveCss = (link: string) => {
    if (link === location.pathname) return "nav-link active";
    else return "nav-link";
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <span className="navbar-brand">Squad</span>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item pe-2">
              <Link to="/board" className={getActiveCss("/board")}>
                Painel Tarefas
              </Link>
            </li>

            <li className="nav-item pe-2">
              <Link
                to="/sprint-planning"
                className={getActiveCss("/sprint-planning")}>
                Planejamento
              </Link>
            </li>

            <li className="nav-item pe-2">
              <Link to="/projects" className={getActiveCss("/projects")}>
                Aplicações
              </Link>
            </li>

            <NavCadastros />
            <NavUtils />

            <li className="nav-item dropdown">
              <span
                className="nav-link dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false">
                Relatórios
              </span>
              <ul className="dropdown-menu">
                <li>
                  <Link to="/reports/gmuds" className="dropdown-item">
                    Gmuds
                  </Link>
                </li>
              </ul>
            </li>

            <li className="nav-item pe-2">
              <Link to="/settings" className={getActiveCss("/settings")}>
                Configurações
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
