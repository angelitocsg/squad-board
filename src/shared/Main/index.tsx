import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import ImportBoardModal from "../../components/ImportBoardModal";
import Navbar from "../Navbar";

const Main = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/") navigate("/home");
  }, [location, navigate]);

  return (
    <>
      <Navbar />
      <Outlet />
      <ImportBoardModal />
    </>
  );
};

export default Main;
