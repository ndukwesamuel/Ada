import { Outlet } from "react-router-dom";
import Header from "./Header";

const AdminLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
