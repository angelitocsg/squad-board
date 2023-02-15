import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

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
    </>
  );
};

export default Main;
