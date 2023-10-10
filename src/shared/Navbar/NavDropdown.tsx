type IProps = {
  label: string;
  children: any;
};
const NavDropdown = ({ label, children }: IProps) => (
  <li className="nav-item dropdown pe-2">
    <span
      className="nav-link dropdown-toggle"
      role="button"
      data-bs-toggle="dropdown"
      aria-expanded="false">
      {label}
    </span>
    <ul className="dropdown-menu">{children}</ul>
  </li>
);
export default NavDropdown;
