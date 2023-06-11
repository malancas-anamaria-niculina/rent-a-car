import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";

const PrivateRoutes = () => {
  const {
    user: { token },
  } = useContext(UserContext);

  return token || localStorage.getItem("userToken") ? (
    <Outlet />
  ) : (
    <Navigate replace to="/" />
  );
};

export default PrivateRoutes;
