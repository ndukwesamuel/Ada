import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
const AdminPrivateRoute = () => {
  const { user } = useSelector((state) => state?.reducer?.AuthSlice);

  let role = user?.data;

  console.log({
    fff: role,
  });

  return user ? <Outlet /> : <Navigate to="/" replace />;
};

export default AdminPrivateRoute;
