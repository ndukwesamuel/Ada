import { Link } from "react-router-dom";
import web from "../../../assets/dashboardIcon/Group 1000004455-1.svg";
import building from "../../../assets/dashboardIcon/Group 1000004455.svg";
import people from "../../../assets/dashboardIcon/Mask group.svg";
import Chart from "./chart";

const HomeEstateDashboard = () => {
  return (
    <div className="">
      {/* Top Section: Estate, Users, Admins */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-6 bg-white shadow-md border rounded-md flex justify-between items-center text-center">
          <div>
            <h2 className="text-[15.18px] font-roboto-slab leading-[20.01px]  font-bold">
              No of estate
            </h2>
            <p className="text-[45.53px] font-roboto-slab font-extralight leading-[60.04px] ">
              120
            </p>
          </div>
          <div className="border rounded-full">
            <img src={building} alt="" />
          </div>
        </div>
        <div className="p-6 bg-white shadow-md border rounded-md flex justify-between items-center text-center">
          <div>
            <h2 className="text-[15.18px] font-roboto-slab leading-[20.01px]  font-bold">
              No of estate
            </h2>
            <p className="text-[45.53px] font-roboto-slab font-extralight leading-[60.04px] ">
              120
            </p>
          </div>
          <div className="border rounded-full">
            <img src={web} alt="" />
          </div>
        </div>
        <div className="p-6 bg-white shadow-md border rounded-md flex justify-between items-center text-center">
          <div>
            <h2 className="text-[15.18px] font-roboto-slab leading-[20.01px]  font-bold">
              No of estate
            </h2>
            <p className="text-[45.53px] font-roboto-slab font-extralight leading-[60.04px] ">
              120
            </p>
          </div>
          <div className="border rounded-full">
            <img src={people} alt="" />
          </div>
        </div>
      </div>

      {/* Middle Section: Chart */}
      <div className="grid grid-cols-1 md:grid-cols-[55%_40%] 2xl:grid-cols-[50%_45%] mb-4 gap-4">
        <div className="p-6 w-full bg-white shadow-lg rounded-md">
          <h3 className="text-xl font-bold mb-4">Chart</h3>
          <div className="h-[300px]">
            <Chart />
          </div>
        </div>
        <div className="w-full">
          <div className="p-6 bg-white shadow-lg rounded-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Emergencies</h3>
              <Link
                to="/dashboard/emergencies"
                className="underline text-success"
              >
                See all
              </Link>
            </div>
            {/* Emergencies List */}
            <div>
              {[...Array(4)].map((_, index) => (
                <div key={index} className="flex items-center mb-4">
                  <span className="text-red-500 mr-3">🚨</span>
                  <div>
                    <p className="font-bold">Theft Alarm</p>
                    <p className="text-sm text-gray-500">
                      4.4.2019; 13:44 - Comment: Wahala wahala lorem ipsum...
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Emergencies and Messages */}

      <div className="grid grid-cols-1 md:grid-cols-2 mb-4 gap-6">
        <div className="w-full">
          <div>
            <div className="p-6 bg-white  shadow-lg rounded-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Recently added user</h3>
                <Link
                  to="/dashboard/estates"
                  className="underline text-success"
                >
                  See all
                </Link>
              </div>
              {/* Messages List */}
              <div>
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="flex items-center mb-4">
                    <div className="mr-3">
                      {/* Profile Image Placeholder */}
                      <span className="inline-block h-8 w-8 rounded-full bg-gray-300"></span>
                    </div>
                    <div>
                      <p className="font-bold">James Bond</p>
                      <p className="text-sm text-gray-500">
                        Comment: Lorem ipsum... - 4.4.2019; 13:44
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white shadow-lg w-full rounded-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">Messages</h3>
            <Link to="/dashboard/messages" className="underline text-success">
              See all
            </Link>
          </div>
          {/* Messages List */}
          <div>
            {[...Array(3)].map((_, index) => (
              <div key={index} className="flex items-center mb-4">
                <div className="mr-3">
                  {/* Profile Image Placeholder */}
                  <span className="inline-block h-8 w-8 rounded-full bg-gray-300"></span>
                </div>
                <div>
                  <p className="font-bold">James Bond</p>
                  <p className="text-sm text-gray-500">
                    Comment: Lorem ipsum... - 4.4.2019; 13:44
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EstateDashboard;
