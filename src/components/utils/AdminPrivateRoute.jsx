import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
const AdminPrivateRoute = () => {
  const { user } = useSelector((state) => state?.reducer?.AuthSlice);

  let role = user?.user?.roles;

  console.log({
    fff: role,
  });

  return role?.includes("superadmin") ? (
    <Outlet />
  ) : (
    <Navigate to="/super-admin-login" replace />
  );
};

export default AdminPrivateRoute;
