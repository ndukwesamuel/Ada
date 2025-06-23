import React, { useState, useRef, useEffect } from "react";
import { IoAttach } from "react-icons/io5";
import { usersDb } from "../../db/usersDb/index";
import userIcon from "../../../assets/dashboardIcon/icons8-person.png";

const Messages = () => {
  const [selectedUser, setSelectedUser] = useState(usersDb[0]);
  const [messageText, setMessageText] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const messageEndRef = useRef(null);

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const handleSendMessage = () => {
    if (messageText.trim()) {
      const newMessage = {
        from: "Me",
        text: messageText,
        time: new Date().toLocaleTimeString(),
      };
      setSelectedUser((prevUser) => ({
        ...prevUser,
        messages: [...prevUser.messages, newMessage],
      }));
      setMessageText("");
    }
  };

  const handleFileUpload = (event) => {
    const files = event.target.files;
    const fileArray = Array.from(files);

    setUploadedFiles(fileArray);

    console.log("Uploaded files:", fileArray);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedUser.messages]);

  return (
    <div className="grid md:grid-cols-2 border-2 ">
      <div className=" p-2">
        <input
          type="text"
          placeholder="Search for user..."
          className="w-full p-2 mb-4 border rounded"
        />
        <div className="space-y-4">
          {usersDb.map((user) => (
            <div
              key={user.id}
              className={`w-full flex justify-between items-center p-2 rounded-lg cursor-pointer ${
                selectedUser.id === user.id ? "bg-gray-100" : "bg-white"
              }`}
              onClick={() => handleUserClick(user)}
            >
              <div className="w-1/4">
                <img
                  src={userIcon}
                  alt={user.name}
                  className="bg-green-50 p-2 rounded-full"
                />
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.status}</p>
                  </div>
                  {user.unread && (
                    <span className="bg-custom-green text-white text-[8px] leading-[12px] tracking-[-0.43px] rounded-[20px] p-1 w-[20px] h-[20px] ml-2 flex items-center justify-center">
                      {user.unread}
                    </span>
                  )}
                </div>
              </div>
              {user.status === "Online" && (
                <div className="ml-auto text-green-500">typing...</div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col p-4 border-l-2 bg-white relative">
        <div className="flex-grow space-y-4 overflow-y-auto pr-2">
          {selectedUser.messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.from === "Me" ? "justify-end" : ""}`}
            >
              <div
                className={`p-4 rounded-lg ${
                  message.from === "Me" ? "bg-gray-200" : "bg-gray-100"
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {message.from}, {message.time}
                </p>
              </div>
            </div>
          ))}
          <div className="h-4  mb-5 " ref={messageEndRef}></div>
        </div>
        <div className="flex items-center mb-3 rounded-[100px] mx-2 p-2 border absolute bottom-0 left-0 right-0 bg-white">
          <input
            type="text"
            placeholder="Start typing here..."
            className="flex-grow p-2 pl-4"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <label className="ml-4">
            <input
              type="file"
              className="hidden"
              onChange={handleFileUpload}
              multiple
            />
            <IoAttach className="w-6 h-6 cursor-pointer" />
          </label>
          <button
            className="ml-4 p-2 bg-custom-green w-[73px] h-[30px] text-white rounded-[100px] flex justify-center items-center"
            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Messages;
