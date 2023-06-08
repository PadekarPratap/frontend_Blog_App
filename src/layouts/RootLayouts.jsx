import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const RootLayouts = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
        <ToastContainer autoClose={1000} position="top-center" />
    </>
  );
};
export default RootLayouts;
