import { PostDetails } from "./PostDetails";
import {
  Heart,
  Users,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  MessageCircle,
  Star,
  Clock,
  User,
} from "lucide-react";
import { formatDate } from "@/utils";
export const PostCard = ({
  post,
  isExpanded,
  onToggleExpansion,
  onDeletePost,
  deleteLoading,
  updateLoading,
}) => {
  const getTotalEngagement = (post) => {
    const totalComments =
      post.comments?.reduce(
        (acc, comment) => acc + 1 + (comment.replies?.length || 0),
        0
      ) || 0;
    return {
      likes: post.likes?.length || 0,
      comments: totalComments,
    };
  };

  const engagement = getTotalEngagement(post);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      {/* Post Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-medium text-gray-900">
                {post.user?.name || "Admin"}
              </span>
              {post.announcement && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  <Star className="w-3 h-3 mr-1" />
                  Announcement
                </span>
              )}
            </div>
            <div className="flex items-center text-sm text-gray-500 space-x-2">
              <Clock className="w-3 h-3" />
              <span>{formatDate(post.createdAt)}</span>
              {post.clan && (
                <>
                  <span>•</span>
                  <Users className="w-3 h-3" />
                  <span>{post.clan.name}</span>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {/* <button
            className="text-gray-400 hover:text-gray-600"
            disabled={updateLoading}
            title="Edit Post"
          >
            <Edit className="w-4 h-4" />
          </button> */}
          <button
            className="text-gray-400 hover:text-red-600"
            onClick={() => onDeletePost(post._id)}
            disabled={deleteLoading}
            title="Delete Post"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Post Content */}
      <div className="mb-4">
        <p className="text-gray-800 whitespace-pre-wrap">{post.content}</p>
      </div>

      {/* Engagement Stats */}
      <div className="flex items-center justify-between border-t border-gray-100 pt-4">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2 text-gray-500">
            <Heart className="w-4 h-4" />
            <span className="text-sm">{engagement.likes} likes</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-500">
            <MessageCircle className="w-4 h-4" />
            <span className="text-sm">{engagement.comments} comments</span>
          </div>
        </div>
        <button
          onClick={() => onToggleExpansion(post._id)}
          className="flex items-center space-x-1 text-green-600 hover:text-green-700 text-sm font-medium"
        >
          {isExpanded ? (
            <>
              <EyeOff className="w-4 h-4" />
              <span>Hide Details</span>
            </>
          ) : (
            <>
              <Eye className="w-4 h-4" />
              <span>View Details</span>
            </>
          )}
        </button>
      </div>

      {/* Expanded Details */}
      {isExpanded && <PostDetails post={post} />}
    </div>
  );
};
