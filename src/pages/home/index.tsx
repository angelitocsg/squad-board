import { Outlet } from "react-router-dom";
import ImportBoardModal from "../../components/ImportBoardModal";
import Navbar from "../../shared/Navbar";

const Home = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <ImportBoardModal />
    </>
  );
};

export default Home;
