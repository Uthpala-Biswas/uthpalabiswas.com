import { cn } from "@/lib/utils";
import { POSTS_PAGE_METADATA_QUERYResult } from "@/sanity/types";
import { PortableText } from "next-sanity";
import { getComponents } from "@/sanity/portableTextComponents";

export function PageDescription({
  description,
}: {
  description: NonNullable<POSTS_PAGE_METADATA_QUERYResult>["description"];
}) {
  return (
    <div
      className={cn(
        description ? "pt-28" : "pt-27",
        "pb-11 bg-gradient-to-b from-secondary from-60% to-background",
      )}
    >
      <div
        className={cn(
          "max-w-6xl px-4 mx-auto text-xl font-extralight [&_p]:text-right text-secondary-foreground secondary-font-family",
        )}
      >
        {description && (
          <PortableText
            value={description}
            components={getComponents("plain")}
          />
        )}
      </div>
    </div>
  );
}
