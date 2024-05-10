import { Outlet, useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation();
  return (
    <>
      {location.pathname !== "/login" && location.pathname !== "/register" && (
        <div>Navbar</div>
      )}{" "}
      <Outlet />
    </>
  );
};

export default Layout;
