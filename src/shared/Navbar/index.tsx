import { Link } from "react-router-dom";

import NavDropdown from "./NavDropdown";
import NavDropdownDivider from "./NavDropdownDivider";
import NavDropdownItem from "./NavDropdownItem";
import NavItem from "./NavItem";

const NavCadastros = () => {
  return (
    <NavDropdown label="Cadastros">
      <NavDropdownItem label="Siglas" link="/cadastros/siglas" />
      <NavDropdownItem
        label="Produtos digitais"
        link="/cadastros/produto-digital"
      />
      <NavDropdownItem label="Repositórios" link="/cadastros/repositorios" />
      <NavDropdownDivider />
      <NavDropdownItem label="Acessos Hub" link="/cadastros/acessos-hub" />
    </NavDropdown>
  );
};

const NavUtils = () => {
  return (
    <NavDropdown label="Utilitários">
      <NavDropdownItem label="Notificações" link="/notifications" />
      <NavDropdownItem label="Editor FAQ" link="/faq-editor" />
      <NavDropdownItem label="Planejamento" link="/sprint-planning" />
    </NavDropdown>
  );
};

// const NavReports = () => {
//   return (
//     <NavDropdown label="Relatórios">
//       <NavDropdownItem label="Gmuds" link="/reports/gmuds" />
//     </NavDropdown>
//   );
// };

const Navbar = () => {
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
            <NavItem label="Produtos" link="/produtos" />
            <NavItem
              label="Gestão de mudanças"
              link="/cadastros/gestao-mudanca"
            />
            <NavItem label="Tarefas" link="/tarefas" />
            <NavItem label="Aplicações" link="/projects" />
            <NavCadastros />
            <NavUtils />
            <NavItem label="Configurações" link="/settings" />
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
