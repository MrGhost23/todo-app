import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  const location = useLocation();
  return (
    <>
      {location.pathname !== "/login" && location.pathname !== "/register" && (
        <Navbar />
      )}{" "}
      <div className="mx-4">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
