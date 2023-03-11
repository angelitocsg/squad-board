import { Link, useLocation } from 'react-router-dom';

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
          aria-label="Toggle navigation"
        >
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
              <Link to="/projects" className={getActiveCss("/projects")}>
                Aplicações
              </Link>
            </li>

            <li className="nav-item pe-2">
              <Link
                to="/notifications"
                className={getActiveCss("/notifications")}
              >
                Notificações
              </Link>
            </li>

            <li className="nav-item pe-2">
              <Link to="/faq-editor" className={getActiveCss("/faq-editor")}>
                Editor FAQ
              </Link>
            </li>

            <li className="nav-item pe-2">
              <Link to="/overview" className={getActiveCss("/overview")}>
                Visão Geral
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
