import { Send, Star } from "lucide-react";

export const CreatePostForm = ({
  newPost,
  setNewPost,
  clans,
  userClan,
  isSuperAdmin,
  createLoading,
  onCreatePost,
}) => (
  <div className="max-w-2xl">
    <div className="space-y-6">
      <div>
        <label
          htmlFor="content"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Post Content
        </label>
        <textarea
          id="content"
          rows={6}
          value={newPost.content}
          onChange={(e) =>
            setNewPost((prev) => ({
              ...prev,
              content: e.target.value,
            }))
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
          placeholder="Share something with your community..."
          required
        />
      </div>

      <div>
        <label
          htmlFor="clan"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          {isSuperAdmin ? "Target Clan" : "Posting to"}
          {!isSuperAdmin && <span className="text-gray-500 ml-1">(Fixed)</span>}
        </label>
        {isSuperAdmin ? (
          <select
            id="clan"
            value={newPost.clan}
            onChange={(e) =>
              setNewPost((prev) => ({
                ...prev,
                clan: e.target.value,
              }))
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
          >
            <option value="">Select a Clan</option>
            {clans.map((clan) => (
              <option key={clan._id} value={clan._id}>
                {clan.name}
              </option>
            ))}
          </select>
        ) : (
          <div className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-50 text-gray-700">
            {userClan?.name || "Your Clan"}{" "}
            {userClan?.members && `(${userClan.members.length} members)`}
          </div>
        )}
      </div>

      <div className="flex items-center">
        <input
          id="announcement"
          type="checkbox"
          checked={newPost.announcement}
          onChange={(e) =>
            setNewPost((prev) => ({
              ...prev,
              announcement: e.target.checked,
            }))
          }
          className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
        />
        <label
          htmlFor="announcement"
          className="ml-2 block text-sm text-gray-700"
        >
          <Star className="w-4 h-4 inline mr-1 text-yellow-500" />
          Mark as Announcement
        </label>
      </div>

      <button
        type="button"
        onClick={onCreatePost}
        disabled={createLoading || !newPost.content.trim()}
        className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {createLoading ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Creating Post...
          </>
        ) : (
          <>
            <Send className="w-4 h-4 mr-2" />
            Create Post
          </>
        )}
      </button>
    </div>
  </div>
);
