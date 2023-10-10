import { Link } from "react-router-dom";

type IProps = {
  label: string;
  link: string;
};
const NavDropdownItem = ({ label, link }: IProps) => (
  <li>
    <Link to={link} className="dropdown-item">
      {label}
    </Link>
  </li>
);
export default NavDropdownItem;
