import { MessageSquare, Plus } from "lucide-react";

export const TabNavigation = ({ activeTab, setActiveTab, postsCount }) => (
  <div className="border-b border-gray-200">
    <nav className="flex space-x-8 px-6">
      <button
        onClick={() => setActiveTab("create")}
        className={`py-4 px-1 border-b-2 font-medium text-sm ${
          activeTab === "create"
            ? "border-green-500 text-green-600"
            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
        }`}
      >
        <Plus className="w-4 h-4 inline mr-2" />
        Create Post
      </button>
      <button
        onClick={() => setActiveTab("posts")}
        className={`py-4 px-1 border-b-2 font-medium text-sm ${
          activeTab === "posts"
            ? "border-green-500 text-green-600"
            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
        }`}
      >
        <MessageSquare className="w-4 h-4 inline mr-2" />
        My Posts ({postsCount})
      </button>
    </nav>
  </div>
);
