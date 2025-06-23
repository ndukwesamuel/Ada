import React, { useState } from "react";
import { emergencies } from "../../db/emergency/index";


const EmergencyDashboard = () => {
  const [selectedEmergency, setSelectedEmergency] = useState(emergencies[0]);
  const [sortOption, setSortOption] = useState("Time sent");

  const handleEmergencyClick = (emergency) => {
    setSelectedEmergency(emergency);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  return (
    <div className="">
      <div className="flex justify-between px-11">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search for user..."
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <select
            value={sortOption}
            onChange={handleSortChange}
            className="w-full p-2 border rounded"
          >
            <option value="resolved">Resolved</option>
            <option value="unresolved">Unresolved</option>
            <option value="timesent">Time sent</option>
          </select>
        </div>
      </div>
      <div className="flex px-6 h-screen">
              <div className="w-[40%] h-full overflow-y-auto hide-scrollbar">
                  <div className="space-y-4">
                      {emergencies.map((emergency) => (
                          <div
                              key={emergency.id}
                              className={`p-4 rounded-lg cursor-pointer ${selectedEmergency.id === emergency.id
                                      ? "bg-red-100 border-l-8 border-red-500"
                                      : "bg-white"
                                  }`}
                              onClick={() => handleEmergencyClick(emergency)}
                          >
                              <div className="flex items-center justify-between">
                                  <div className="flex items-center">
                                      <span className="mr-2">
                                          {emergency.type === "Fire Alarm"
                                              ? "🔥"
                                              : emergency.type === "Medical Assistance"
                                                  ? "🟢"
                                                  : emergency.type === "Theft Alarm"
                                                      ? "⚠️"
                                                      : emergency.type === "Kidnap Alarm"
                                                          ? "🚨"
                                                          : ""}
                                      </span>
                                      <span className="font-roboto-slab font-bold text-[14.74px] leading-[19.44px] ">
                                          {emergency.type}
                                      </span>
                                  </div>
                                  <span className="text-sm text-gray-600">
                                      {emergency.time}
                                  </span>
                              </div>
                              <p className="text-gray-600 text-sm mt-2 truncate">
                                  Comment: {emergency.comment}
                              </p>
                          </div>
                      ))}
                  </div>
              </div>


        {/* Right side with independent overflow */}
        <div className="w-2/3 ml-6 p-4 bg-white rounded-lg shadow-md h-full overflow-y-auto">
          <h2 className="text-red-500 font-semibold mb-2">Unresolved</h2>
          <div className="items-center mb-4">
            <img
              src="https://via.placeholder.com/50"
              alt="User"
              className="w-12 h-12 rounded-full mr-4"
            />
            <div className="mt-4">
              <h3 className="font-semibold text-lg">James Bond</h3>
              <p className="text-gray-500 text-sm">24 hours ago</p>
            </div>
          </div>
          <p className="text-gray-600 mb-4">
            0812345678
            <br />
            House address lorem ipsum stuff
          </p>
          <div className="mb-4">
            <h4 className="text-lg font-semibold text-red-500 mb-2">
              {selectedEmergency.type}
            </h4>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet consectetur. Quis dictumst quis lorem
              adipiscing commodo integer amet ac molestie. Urna fringilla
              faucibus sed vitae eget. Ultricies sed elementum suspendisse id.
              Justo tellus vitae sapien placerat orci ultricies. Lacus amet.
            </p>
          </div>
          <div className="flex space-x-4">
            <button className="bg-custom-green text-white py-2 px-4 rounded">
              Send a message
            </button>
            <button className="bg-[#F3FFF3] text-custom-green border-green-600 border-2 py-2 px-4 rounded">
              Message admin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyDashboard;
