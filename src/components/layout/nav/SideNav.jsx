import MainNav from "./AdminNav";

const Sidebar = ({ navData, className }) => {
  
    return (
      <div
        className={`bg-white py-8 px-10 flex flex-col gap-12 row-span-full ${className}`}
      >
        <div className="flex items-center justify-center">
          <h1 className=" lg:block text-green-600 font-bold text-3xl">
            Admin
          </h1>
        </div>
        <MainNav data={navData} />
      </div>
    );
  };
  
  export default Sidebar;
  