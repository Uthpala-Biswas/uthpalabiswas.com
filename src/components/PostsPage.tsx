"use client";
import { useState } from "react";
import { PostCards } from "@/components/PostCards";
import { PageDescription } from "@/components/PageDescription";
import { PostsTopBar } from "@/components/PostsTopBar";
import {
  POSTS_QUERYResult,
  POSTS_PAGE_METADATA_QUERYResult,
} from "@/sanity/types";
import { cn } from "@/lib/utils";

export function PostsPage({
  description,
  posts,
  isCategoryPage = false,
  categorySlug,
}: {
  description: NonNullable<POSTS_PAGE_METADATA_QUERYResult>["description"];
  posts: POSTS_QUERYResult;
  isCategoryPage?: boolean;
  categorySlug?: string;
}) {
  const allCategories: Array<
    NonNullable<POSTS_QUERYResult[number]["category"]>
  > = [];

  const uniquieCategorySlugs: string[] = [];

  posts.forEach((post) => {
    if (post.category?.slug?.current) {
      if (!uniquieCategorySlugs.includes(post.category.slug.current)) {
        allCategories.push(post.category);
        uniquieCategorySlugs.push(post.category.slug.current);
      }
    }
  });

  const [filteredPosts, setFilteredPosts] = useState<POSTS_QUERYResult>(posts);

  return (
    <main>
      <PageDescription description={description} />
      <div
        className={cn(
          "max-w-6xl mx-auto px-4 mb-12 sm:mb-20",
          description ? "" : "-mt-20 sm:-mt-10",
        )}
      >
        <PostsTopBar
          isCategoryPage={isCategoryPage}
          allPosts={posts}
          setFilteredPosts={setFilteredPosts}
          allCategories={allCategories}
          categorySlug={categorySlug}
          filteredPostsCount={filteredPosts.length}
        />
        <PostCards posts={filteredPosts} />
      </div>
    </main>
  );
}
