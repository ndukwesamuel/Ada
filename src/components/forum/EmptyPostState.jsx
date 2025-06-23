import { MessageSquare } from "lucide-react";
export const EmptyPostsState = ({ isSuperAdmin, userClan, onCreatePost }) => (
  <div className="text-center py-12">
    <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
    <h3 className="text-lg font-medium text-gray-900 mb-2">No posts yet</h3>
    <p className="text-gray-500 mb-4">
      {isSuperAdmin
        ? "Create your first forum post for any clan"
        : `Create your first forum post for ${userClan?.name || "your clan"}`}
    </p>
    <button
      onClick={onCreatePost}
      className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
    >
      Create Post
    </button>
  </div>
);
