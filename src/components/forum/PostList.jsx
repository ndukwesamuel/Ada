import { EmptyPostsState } from "./EmptyPostState";
import { PostCard } from "./PostCard";
export const PostsList = ({
  posts,
  expandedPosts,
  onToggleExpansion,
  onDeletePost,
  deleteLoading,
  updateLoading,
  isSuperAdmin,
  userClan,
  onCreatePost,
}) => {
  if (posts.length === 0) {
    return (
      <EmptyPostsState
        isSuperAdmin={isSuperAdmin}
        userClan={userClan}
        onCreatePost={onCreatePost}
      />
    );
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <PostCard
          key={post._id}
          post={post}
          isExpanded={expandedPosts.has(post._id)}
          onToggleExpansion={onToggleExpansion}
          onDeletePost={onDeletePost}
          deleteLoading={deleteLoading}
          updateLoading={updateLoading}
        />
      ))}
    </div>
  );
};
