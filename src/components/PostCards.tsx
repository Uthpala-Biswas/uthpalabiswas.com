import { PostCard } from "@/components/PostCard";
import { POSTS_QUERYResult } from "@/sanity/types";

export function PostCards({
  posts,
  hideMeta,
}: {
  posts: POSTS_QUERYResult;
  hideMeta?: boolean;
}) {
  return (
    <div className="columns-1 gap-3 sm:columns-2 lg:columns-3">
      {posts.map((post, i) => (
        <PostCard key={post._id} {...post} index={i} hideMeta={hideMeta} />
      ))}
    </div>
  );
}
