import { HOMEPAGE_QUERYResult } from "@/sanity/types";
import { PostCards } from "@/components/PostCards";

type HomepageBlocks = NonNullable<
  NonNullable<HOMEPAGE_QUERYResult>["pageBuilder"]
>[number];

type PickedPostsBlock = Extract<HomepageBlocks, { _type: "pickedPosts" }>;

export function PickedPosts({ heading, posts }: PickedPostsBlock) {
  return (
    <section className="my-10 sm:my-14 max-w-5xl mx-auto relative z-1">
      {heading && (
        <h2 className="mx-3 mb-6 text-5xl font-light text-foreground text-center sm:text-left">
          {heading}
        </h2>
      )}
      {posts && (
        <div className="mx-3">
          <PostCards posts={posts} hideMeta={true} />
        </div>
      )}
    </section>
  );
}
