import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { stegaClean } from "next-sanity";
import { PortableText } from "next-sanity";
import { getComponents } from "@/sanity/portableTextComponents";
import { HOMEPAGE_QUERYResult } from "@/sanity/types";

type HomepageBlocks = NonNullable<
  NonNullable<HOMEPAGE_QUERYResult>["pageBuilder"]
>[number];

type SplitImageBlock = Extract<HomepageBlocks, { _type: "splitImage" }>;

export function SplitImage({
  contentMatter,
  image,
  orientation,
}: SplitImageBlock) {
  return (
    <div className="my-5 mx-3 relative z-1">
      <section
        className="shadow-sm border-oldvest/30 flex group bg-[#FCF7F2] flex-col sm:data-[orientation='imageLeft']:flex-row sm:data-[orientation='imageRight']:flex-row-reverse max-w-5xl gap-5 mx-auto p-5 text-right [&_*]:text-left"
        data-orientation={stegaClean(orientation) || "imageLeft"}
      >
        <div className="grow-1 shrink-[0] sm:max-w-[40%] sm:min-w-[40%] border">
          {image ? (
            <Image
              className="w-full sm:group-data-[orientation='imageLeft']:float-right sm:group-data-[orientation='imageRight']:float-left sticky top-[50px]"
              src={urlFor(image).width(383).height(500).url()}
              width={383}
              height={500}
              alt=""
            />
          ) : null}
        </div>
        <div className="grow-1 sm:max-w-[60%] text-lg p-5 split-image-content grid sm:place-items-center">
          <div>
            {contentMatter && (
              <PortableText
                value={contentMatter}
                components={getComponents("plain")}
              />
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
