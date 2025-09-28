"use client";
import { type Dispatch, type SetStateAction, useState } from "react";
import { POSTS_QUERYResult } from "@/sanity/types";
import { cn } from "@/lib/utils";
import { inter } from "@/lib/fonts";
import { LanguageFilter } from "@/components/LanguageFilter";

interface PostsFilterProps {
  categories: NonNullable<POSTS_QUERYResult[number]["category"]>[];
  allPosts: POSTS_QUERYResult;
  setFilteredPosts: Dispatch<SetStateAction<POSTS_QUERYResult>>;
}
export function PostsFilter(props: PostsFilterProps) {
  const [postsCount, setPostsCount] = useState(props.allPosts.length);
  const [activeLang, setActiveLang] = useState<string>("both");
  const [activeCategorySlug, setActiveCategorySlug] = useState<string | null>(
    null,
  );

  function handlePostFilter(categorySlug?: string | null) {
    if (categorySlug === undefined) return;
    const postsFilteredByLang =
      activeLang !== "both"
        ? props.allPosts.filter((post) => post.language === activeLang)
        : props.allPosts;

    const filteredPosts = postsFilteredByLang.filter(
      (post) => post.category?.slug?.current === categorySlug,
    );
    if (categorySlug === activeCategorySlug) {
      props.setFilteredPosts(postsFilteredByLang);
      setActiveCategorySlug(null);
      setPostsCount(postsFilteredByLang.length);
    } else {
      props.setFilteredPosts(filteredPosts);
      setActiveCategorySlug(categorySlug);
      setPostsCount(filteredPosts.length);
    }
  }

  return (
    <div className={cn("mt-5 mb-10", inter.className)}>
      <div className="flex justify-between items-start sm:items-center sm:flex-row flex-col gap-2 sm:gap-0">
        <div className="flex text-sm leading-5 gap-1 text-muted-foreground items-start border-b border-sacred-500">
          <span className="text-foreground shrink-0 flex items-center py-1 w-[96px]">
            CATEGORIES{" "}
            <span className="ml-1 text-sacred-800 font-extralight">|</span>
          </span>
          <ul className="inline-flex flex-wrap mt-0">
            {props.categories?.map((category, i) => (
              <li key={i}>
                <button
                  onClick={() => handlePostFilter(category.slug?.current)}
                  className={cn(
                    "hover:bg-sacred-300/40 transition-all duration-300 px-1.5 py-1 inline-block cursor-pointer select-none",
                    activeCategorySlug == category.slug?.current &&
                      "bg-sacred-500 text-sacred-50 hover:text-sacred-50 hover:bg-sacred-500",
                  )}
                >
                  {category.title}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => handlePostFilter(activeCategorySlug)}
                className={cn(
                  "hover:bg-sacred-300/40 transition-all duration-300 px-1.5 py-1 inline-block cursor-pointer select-none",
                  activeCategorySlug == null &&
                    "bg-sacred-500 text-sacred-50 hover:text-sacred-50 hover:bg-sacred-500",
                )}
              >
                All posts
              </button>
            </li>
          </ul>
        </div>
        <LanguageFilter
          allPosts={props.allPosts}
          activeCategorySlug={activeCategorySlug}
          activeLang={activeLang}
          setActiveLang={setActiveLang}
          setFilteredPosts={props.setFilteredPosts}
          setPostsCount={setPostsCount}
        />
      </div>
      <p className="text-sm ml-0 text-muted-foreground py-1.5 text-right sm:text-left">
        {postsCount} post{postsCount > 1 || postsCount == 0 ? "s" : ""}
      </p>
    </div>
  );
}
