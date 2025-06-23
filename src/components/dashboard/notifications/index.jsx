import React, { useState } from "react";
import { notifications } from "../../db/notifications/index";


const Notification = () => {
  const [activeNotification, setActiveNotification] = useState(
    notifications[0]
  );

  return (
    <div className="flex h-screen">
      <div className="w-[45%] bg-gray-100 p-2">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`flex items-center p-4 mb-4 cursor-pointer rounded-lg transition ${
              activeNotification.id === notification.id
                ? "bg-green-50 border-l-8 border-green-500"
                : "bg-white hover:bg-gray-200"
            }`}
            onClick={() => setActiveNotification(notification)}
          >
            <div className="flex-grow">
              <h2 className="font-semibold leading-[18.46px] font-roboto text-[14px]">
                {notification.title}
              </h2>
              <p className="text-xs leading-[15.83px] font-roboto-slab text-[#151313] truncate">
                {notification.description}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-green-600">
                {notification.status}
              </p>
              <p className="text-xs text-gray-400">{notification.date}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Right side - Content Display */}
      <div className="w-[55%] p-8">
        <h1 className="text-2xl font-bold mb-4">{activeNotification.title}</h1>
        <p className="text-sm text-gray-500 mb-8">{activeNotification.date}</p>
        <p>{activeNotification.content}</p>
      </div>
    </div>
  );
};

export default Notification;
