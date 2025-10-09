import { PortableText } from "next-sanity";
import { getComponents } from "@/sanity/portableTextComponents";
import { HOMEPAGE_QUERYResult } from "@/sanity/types";

type HomepageBlocks = NonNullable<
  NonNullable<HOMEPAGE_QUERYResult>["pageBuilder"]
>[number];

type ContentBlock = Extract<HomepageBlocks, { _type: "content" }>;

export function Content({ contentMatter }: ContentBlock) {
  return (
    <section className="text-lg mx-auto my-5 sm:my-12 max-w-3xl px-4 sm:px-6 lg:px-8 relative z-1">
      {contentMatter && (
        <PortableText
          value={contentMatter}
          components={getComponents("plain")}
        />
      )}
    </section>
  );
}
