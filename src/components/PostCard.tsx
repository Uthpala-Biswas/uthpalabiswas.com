"use client";
import { POSTS_QUERYResult } from "@/sanity/types";
import { PublishedAt } from "@/components/PublishedAt";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { inter, noto_sans_bengali } from "@/lib/fonts";

export function PostCard(
  props: POSTS_QUERYResult[0] & {
    index: number;
    hideMeta?: boolean;
  },
) {
  const {
    title,
    mainImage,
    publishedAt,
    category,
    description,
    language,
    hideMeta,
  } = props;

  const categoryTitle =
    language == "bn"
      ? category?.titleInBangla?.trim() || category?.title
      : category?.title;

  const imageWidth = 400;
  const imageHeight = 200;

  return (
    <Link
      className="group"
      href={`/posts/${props.category?.slug?.current}/${props.slug!.current}`}
    >
      <article
        lang={language!}
        className="overflow-hidden border bg-card/50 flex flex-col text-card-foreground rounded-lg group h-full duration-300 transition-all hover:shadow-sm pointer-coarse:shadow-sm break-inside-avoid-column mb-3 text-sm"
      >
        {mainImage?.asset ? (
          <>
            <div className="rounded-t-lg bg-card p-1.5">
              <Image
                className="rounded-t-md border w-full"
                src={urlFor(mainImage)
                  .width(imageWidth)
                  .height(imageHeight)
                  .url()}
                width={imageWidth}
                height={imageHeight}
                alt={mainImage.alt || title || ""}
              />
            </div>
          </>
        ) : null}
        <div className="flex flex-col h-full w-full px-4 pb-4 relative">
          <div className="absolute w-full bg-card h-0 group-hover:h-full pointer-coarse:h-full transition-all left-0 z-0"></div>
          <div className="z-1">
            <h2 className="text-3xl tracking-tight mt-3 font-semibold text-muted-foreground group-hover:text-foreground pointer-coarse:text-foreground transition-colors leading-10">
              {title}
            </h2>
            {!hideMeta && (
              <>
                <p
                  className={cn(
                    "text-sm mt-1 text-right",
                    language == "bn"
                      ? noto_sans_bengali.className
                      : inter.className,
                  )}
                >
                  <PublishedAt language={language} publishedAt={publishedAt} />
                  <span className="mx-1 group-hover:text-sacred-800 pointer-coarse:text-sacred-800 font-extralight">
                    |
                  </span>
                  <span>{categoryTitle}</span>
                </p>
              </>
            )}
            <p className="text-base mt-4">
              {description && <>{description.trim()}&nbsp;</>}
              <ReadMore language={language} />
            </p>
          </div>
        </div>
      </article>
    </Link>
  );
}

function ReadMore({ language }: { language: string | null }) {
  return (
    <span className="opacity-0 group-hover:opacity-100 pointer-coarse:opacity-100 transition-all duration-300 text-nowrap">
      {language == "bn" ? <>আরো পড়ুন </> : <>Read more </>}
      <span className="inline-block transition-all translate-x-[-12px] group-hover:translate-x-[2px] pointer-coarse:translate-x-[2px] opacity-0 group-hover:opacity-100 pointer-coarse:opacity-100 duration-600">
        ⟶
      </span>
    </span>
  );
}
