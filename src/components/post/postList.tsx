import { PostListProps } from "../../lib/types/index";
import PostCard from "./postCard";

function PostList({ allPosts }: PostListProps) {
  return (
    <div className="grid grid-cols-1 mt-10 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {allPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

export default PostList;
