import { POST_QUERYResult } from "@/sanity/types";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { PortableText } from "next-sanity";
import { getComponents } from "@/sanity/portableTextComponents";
import { PublishedAt } from "@/components/PublishedAt";
import { TextLink } from "@/components/TextLink";
import { inter, noto_sans_bengali } from "@/lib/fonts";
import { cn } from "@/lib/utils";

export function Post(props: NonNullable<POST_QUERYResult>) {
  const { language, title, mainImage, body, publishedAt, category } = props;

  const categoryTitle =
    language == "bn"
      ? category?.titleInBangla?.trim() || category?.title
      : category?.title;

  return (
    <article lang={language!}>
      {mainImage?.asset ? (
        <div className="pt-[44px] sm:pt-[80px] bg-gradient-to-b from-25% from-secondary to-background">
          <Image
            className="mx-auto"
            src={urlFor(mainImage)
              .width(1200)
              .height(560)
              .quality(80)
              .auto("format")
              .url()}
            alt={mainImage?.alt || ""}
            width="1200"
            height="560"
          />
        </div>
      ) : (
        <div className="pt-60 sm:pt-70 bg-gradient-to-b from-secondary from-40% h-100 -mb-90 sm:-mb-70"></div>
      )}
      <div
        className={cn(
          "max-w-[780px] mx-auto px-3 sm:px-10 sm:py-4 relative z-2",
          !mainImage?.asset && "pt-8",
        )}
      >
        <h1 className="scroll-mt-20 text-center sm:text-left tracking-tight [&_code]:text-[1em] text-4xl font-bold lg:text-5xl mb-2 mt-3 sm:mt-5 leading-12 lg:leading-16 text-shadow-md">
          {title}
        </h1>
        <div
          className={cn(
            "text-center sm:text-right text-muted-foreground/85 text-sm mt-4",
            language == "bn" ? noto_sans_bengali.className : inter.className,
          )}
        >
          {language == "bn" ? (
            <>
              <TextLink href={`/posts/${category?.slug?.current}`}>
                {categoryTitle}
              </TextLink>{" "}
              বিভাগে প্রকাশিত হয়েছে
              <br />
              {
                <PublishedAt language={language} publishedAt={publishedAt} />
              }{" "}
              তারিখে
            </>
          ) : (
            <>
              <p>
                Filed under{" "}
                <TextLink href={`/posts/${category?.slug?.current}`}>
                  {categoryTitle}
                </TextLink>
              </p>
              <p>
                Published on{" "}
                <PublishedAt language={language} publishedAt={publishedAt} />
              </p>
            </>
          )}
        </div>
        <div className="mt-8 sm:text-lg">
          {body ? (
            <div>
              <PortableText value={body} components={getComponents("post")} />
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}
