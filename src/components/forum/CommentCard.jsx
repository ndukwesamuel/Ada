export const CommentCard = ({ comment }) => (
  <div className="bg-gray-50 rounded-lg p-4">
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center space-x-2">
        <span className="font-medium text-sm text-gray-900">
          {comment.user?.name}
        </span>
        {comment.isAdmin && (
          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
            Admin
          </span>
        )}
      </div>
    </div>
    <p className="text-gray-700 text-sm mb-3">{comment.content}</p>

    {/* Replies */}
    {comment.replies && comment.replies.length > 0 && (
      <div className="space-y-2 ml-4 border-l-2 border-gray-200 pl-4">
        {comment.replies.map((reply) => (
          <div key={reply._id} className="bg-white rounded p-3">
            <div className="flex items-center space-x-2 mb-1">
              <span className="font-medium text-sm text-gray-900">
                {reply.user?.name}
              </span>
              {reply.isAdmin && (
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                  Admin
                </span>
              )}
            </div>
            <p className="text-gray-700 text-sm">{reply.content}</p>
          </div>
        ))}
      </div>
    )}
  </div>
);
