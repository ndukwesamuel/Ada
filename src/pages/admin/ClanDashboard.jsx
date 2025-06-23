import React, { useState } from "react";

import { Link } from "react-router-dom";

const ClanDashboard = ({ clans = {} }) => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Provide default values and safe access
  const clanData = clans.data || [];
  const clanCount = clans.count || 0;

  // Filter clans based on search term and active tab
  const filteredClans = clanData.filter((clan) => {
    const matchesSearch =
      clan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      clan.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === "all" || clan.status === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Clan Management
        </h1>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Search clans by name or email..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            )}
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-4 py-2 rounded-lg ${
                activeTab === "all"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 border"
              }`}
            >
              All ({clanCount})
            </button>
            <button
              onClick={() => setActiveTab("approved")}
              className={`px-4 py-2 rounded-lg ${
                activeTab === "approved"
                  ? "bg-green-600 text-white"
                  : "bg-white text-gray-700 border"
              }`}
            >
              Approved
            </button>
            <button
              onClick={() => setActiveTab("pending")}
              className={`px-4 py-2 rounded-lg ${
                activeTab === "pending"
                  ? "bg-yellow-500 text-white"
                  : "bg-white text-gray-700 border"
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setActiveTab("suspended")}
              className={`px-4 py-2 rounded-lg ${
                activeTab === "suspended"
                  ? "bg-red-600 text-white"
                  : "bg-white text-gray-700 border"
              }`}
            >
              Suspended
            </button>
          </div>
        </div>

        {/* Clan Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClans.map((clan) => (
            <Link
              to={`/admin-dashboard-service/estates/${clan._id}`}
              key={clan._id}
              className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="p-5">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      {clan.name}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                      {clan.uniqueClanID}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      clan.status === "approved"
                        ? "bg-green-100 text-green-800"
                        : clan.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : clan.status === "suspended"
                        ? "bg-red-100 text-red-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {clan.status.charAt(0).toUpperCase() + clan.status.slice(1)}
                  </span>
                </div>

                <div className="mt-4">
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    {clan.email}
                  </div>
                  {clan.address && (
                    <div className="flex items-start text-sm text-gray-600 mb-2">
                      <svg
                        className="w-4 h-4 mr-2 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span className="flex-1">{clan.address}</span>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex justify-between text-sm">
                    <div>
                      <span className="font-medium text-gray-700">
                        {clan.members?.length || 0}
                      </span>
                      <span className="text-gray-500 ml-1">members</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">
                        {clan.admins?.length || 0}
                      </span>
                      <span className="text-gray-500 ml-1">admins</span>
                    </div>
                    <div className="text-gray-500">
                      Created:{" "}
                      {clan.createdAt
                        ? new Date(clan.createdAt).toLocaleDateString()
                        : "N/A"}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 px-5 py-3 flex justify-between items-center">
                <div className="flex items-center">
                  <img
                    className="w-8 h-8 rounded-full mr-2"
                    src={`https://ui-avatars.com/api/?name=${
                      clan.creator?.name || "Unknown"
                    }&background=random`}
                    alt={clan.creator?.name || "Unknown creator"}
                  />
                  <span className="text-sm text-gray-700">
                    {clan.creator?.name || "Unknown creator"}
                  </span>
                </div>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  View Details →
                </button>
              </div>
            </Link>
          ))}
        </div>

        {filteredClans.length === 0 && (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">
              No clans found
            </h3>
            <p className="mt-1 text-gray-500">
              {searchTerm
                ? "Try a different search term"
                : "No clans match the current filters"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClanDashboard;
