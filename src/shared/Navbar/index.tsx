import { Link, useLocation } from "react-router-dom";

import NavDropdown from "./NavDropdown";
import NavDropdownDivider from "./NavDropdownDivider";
import NavDropdownItem from "./NavDropdownItem";

const NavCadastros = () => {
  return (
    <NavDropdown label="Cadastros">
      <NavDropdownItem label="Produtos digitais" link="/cadastros/produto-digital" />
      <NavDropdownItem label="Repositórios" link="/cadastros/repositorios" />
      <NavDropdownDivider />
      <NavDropdownItem label="Gestão de mudanças" link="/cadastros/gestao-mudanca" />
    </NavDropdown>
  );
};

const NavUtils = () => {
  return (
    <NavDropdown label="Utilitários">
      <NavDropdownItem label="Notificações" link="/notifications" />
      <NavDropdownItem label="Editor FAQ" link="/faq-editor" />
    </NavDropdown>
  );
};

const NavReports = () => {
  return (
    <NavDropdown label="Relatórios">
      <NavDropdownItem label="Gmuds" link="/reports/gmuds" />
    </NavDropdown>
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
        <Link to="/" className="navbar-brand">
          Squad
        </Link>
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
              <Link to="/sprint-planning" className={getActiveCss("/sprint-planning")}>
                Planejamento
              </Link>
            </li>
            <li className="nav-item pe-2">
              <Link to="/produtos" className={getActiveCss("/produtos")}>
                Produtos
              </Link>
            </li>
            <li className="nav-item pe-2">
              <Link to="/tarefas" className={getActiveCss("/tarefas")}>
                Tarefas
              </Link>
            </li>
            <li className="nav-item pe-2">
              <Link to="/projects" className={getActiveCss("/projects")}>
                Aplicações
              </Link>
            </li>
            <NavCadastros />
            <NavUtils />
            <NavReports />
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
