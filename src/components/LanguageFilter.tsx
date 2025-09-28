import { type Dispatch, type SetStateAction } from "react";
import { POSTS_QUERYResult } from "@/sanity/types";
import { cn } from "@/lib/utils";

const langs = [
  { short: "en", long: "English" },
  { short: "bn", long: "Bangla" },
];

export function LanguageFilter({
  allPosts,
  activeCategorySlug,
  setFilteredPosts,
  setPostsCount,
  activeLang,
  setActiveLang,
}: {
  allPosts: POSTS_QUERYResult;
  activeCategorySlug: string | null;
  activeLang: string;
  setActiveLang: Dispatch<SetStateAction<string>>;
  setFilteredPosts: Dispatch<SetStateAction<POSTS_QUERYResult>>;
  setPostsCount: Dispatch<SetStateAction<number>>;
}) {
  function filterByLanguage(lang: string) {
    const postsFilteredByCategory = activeCategorySlug
      ? allPosts.filter(
          (post) => post.category?.slug?.current === activeCategorySlug,
        )
      : allPosts;
    if (lang !== "both") {
      const postsFilteredByLang = postsFilteredByCategory.filter(
        (post) => post.language === lang,
      );
      setFilteredPosts(postsFilteredByLang);
      setPostsCount(postsFilteredByLang.length);
    } else {
      setFilteredPosts(postsFilteredByCategory);
      setPostsCount(postsFilteredByCategory.length);
    }
    setActiveLang(lang);
  }
  return (
    <div className="flex text-sm leading-5 gap-1 text-muted-foreground items-start border-b border-sacred-500 grow self-stretch">
      <span className="sm:ml-auto ml-0 text-foreground shrink-0 flex items-center py-1 w-[96px] justify-end">
        LANG<span className="ml-1 text-sacred-800 font-extralight">|</span>
      </span>
      <span className="flex">
        {langs.map((lang, i) => (
          <button
            key={i}
            onClick={() => {
              if (activeLang === lang.short) {
                filterByLanguage("both");
              } else {
                filterByLanguage(lang.short);
              }
            }}
            className={cn(
              "hover:bg-sacred-300/40 transition-all duration-300 px-1.5 py-1 inline-block cursor-pointer select-none",
              activeLang == lang.short &&
                "bg-sacred-500 text-sacred-50 hover:text-sacred-50 hover:bg-sacred-500",
            )}
          >
            {lang.long}
          </button>
        ))}
      </span>
    </div>
  );
}
