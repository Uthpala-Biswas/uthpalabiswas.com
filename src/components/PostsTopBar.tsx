import { type Dispatch, type SetStateAction } from "react";
import { PostsFilter } from "@/components/PostsFilter";
import { POSTS_QUERYResult } from "@/sanity/types";
import { cn } from "@/lib/utils";
import { inter } from "@/lib/fonts";
import { TextLink } from "./TextLink";

export function PostsTopBar({
  isCategoryPage,
  allPosts,
  allCategories,
  setFilteredPosts,
  categorySlug,
  filteredPostsCount,
}: {
  isCategoryPage: boolean;
  allPosts: POSTS_QUERYResult;
  allCategories: Array<NonNullable<POSTS_QUERYResult[number]["category"]>>;
  setFilteredPosts: Dispatch<SetStateAction<POSTS_QUERYResult>>;
  categorySlug?: string;
  filteredPostsCount: number;
}) {
  const category = allPosts.find(
    (post) => post.category?.slug?.current === categorySlug,
  )?.category;

  return (
    <>
      {isCategoryPage && (
        <div className={cn("my-5 border-b border-sacred-500", inter.className)}>
          <p className="text-sm ml-0 text-muted-foreground py-1">
            {filteredPostsCount} post
            {filteredPostsCount > 1 ? "s" : ""} found in &ldquo;
            {category?.title}&rdquo; category.{" "}
            <TextLink href="/posts">See all posts</TextLink>.
          </p>
        </div>
      )}
      {!isCategoryPage && (
        <PostsFilter
          allPosts={allPosts}
          categories={allCategories}
          setFilteredPosts={setFilteredPosts}
        />
      )}
    </>
  );
}
