import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../../contexts/Auth";
import { useSelector } from "react-redux";
const EstateAdminPrivateRoute = () => {
  //   const { auth } = useAuth();
  //   const user = auth?.user;

  //   const data = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state?.reducer?.AuthSlice);

  console.log({
    fff: user?.user?.estates,
  });

  // Check if the user has the required admin role and isAdmin flag is true
  // const isAdmin = user?.roles?.includes("admin") && user?.admin === true;

  return user?.user?.estates ? <Outlet /> : <Navigate to="/" replace />;
};

export default EstateAdminPrivateRoute;
