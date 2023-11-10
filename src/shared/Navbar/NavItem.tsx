import { Link, useLocation } from "react-router-dom";

type IProps = {
  label: string;
  link: string;
};
const NavItem = ({ label, link }: IProps) => {
  const location = useLocation();

  const getActiveCss = (link: string) => {
    if (link === location.pathname) return "nav-link active";
    else return "nav-link";
  };

  return (
    <li className="nav-item pe-2">
      <Link to={link} className={getActiveCss(link)}>
        {label}
      </Link>
    </li>
  );
};

export default NavItem;
