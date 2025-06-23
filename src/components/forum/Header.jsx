export const ForumHeader = ({ adminType, userClan, isSuperAdmin }) => (
  <div className="border-b border-gray-200 p-6">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Forum Management
        </h1>
        <p className="text-gray-600">
          {isSuperAdmin
            ? "Create and manage forum posts across all clans"
            : `Manage forum posts for ${userClan?.name || "your clan"}`}
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-600`}
        >
          {isSuperAdmin ? "Super Admin" : "Estate Admin"}
        </span>
      </div>
    </div>
  </div>
);
