import { Heart, MessageCircle } from "lucide-react";
import { CommentCard } from "./CommentCard";
export const PostDetails = ({ post }) => (
  <div className="mt-6 border-t border-gray-100 pt-6">
    {/* Likes Section */}
    {post.likes && post.likes.length > 0 && (
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3 flex items-center">
          <Heart className="w-4 h-4 mr-2 text-red-500" />
          Likes ({post.likes.length})
        </h4>
        <div className="flex flex-wrap gap-2">
          {post.likes.map((like) => (
            <span
              key={like._id}
              className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700"
            >
              {like.name}
            </span>
          ))}
        </div>
      </div>
    )}

    {/* Comments Section */}
    {post.comments && post.comments.length > 0 && (
      <div>
        <h4 className="font-medium text-gray-900 mb-4 flex items-center">
          <MessageCircle className="w-4 h-4 mr-2 text-green-500" />
          Comments ({post.comments.length})
        </h4>
        <div className="space-y-4">
          {post.comments.map((comment) => (
            <CommentCard key={comment._id} comment={comment} />
          ))}
        </div>
      </div>
    )}
  </div>
);
