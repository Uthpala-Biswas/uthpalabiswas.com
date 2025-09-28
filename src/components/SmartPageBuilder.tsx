"use client";

import { Hero } from "@/components/blocks/Hero";
import { SplitImage } from "@/components/blocks/SplitImage";
import { PickedPosts } from "@/components/blocks/PickedPosts";
import { Content } from "@/components/blocks/Content";
import { client } from "@/sanity/lib/client";
import { createDataAttribute } from "next-sanity";
import { useOptimistic } from "next-sanity/hooks";
import {
  HOMEPAGE_QUERYResult,
  ABOUT_ME_PAGE_QUERYResult,
} from "@/sanity/types";

type PageBuilderBlock = NonNullable<
  NonNullable<HOMEPAGE_QUERYResult>["pageBuilder"]
>[number];

type PageDocument = HOMEPAGE_QUERYResult | ABOUT_ME_PAGE_QUERYResult;

type PageBuilderProps = {
  content: PageBuilderBlock[];
  documentId: string;
  documentType: string;
};

const { projectId, dataset, stega } = client.config();
export const createDataAttributeConfig = {
  projectId,
  dataset,
  baseUrl: typeof stega.studioUrl === "string" ? stega.studioUrl : "",
};

export function SmartPageBuilder({
  content,
  documentId,
  documentType,
}: PageBuilderProps) {
  const blocks = useOptimistic<PageBuilderBlock[] | undefined, PageDocument>(
    content,
    (state, action) => {
      if (action.id === documentId) {
        return action?.document?.pageBuilder?.map(
          (block: PageBuilderBlock) =>
            state?.find((s) => s._key === block?._key) || block,
        );
      }
      return state;
    },
  );

  if (!Array.isArray(blocks)) {
    return null;
  }

  return (
    <main
      data-sanity={createDataAttribute({
        ...createDataAttributeConfig,
        id: documentId,
        type: documentType,
        path: "pageBuilder",
      }).toString()}
    >
      {blocks.map((block) => {
        const DragHandle = ({ children }: { children: React.ReactNode }) => (
          <div
            data-sanity={createDataAttribute({
              ...createDataAttributeConfig,
              id: documentId,
              type: documentType,
              path: `pageBuilder[_key=="${block._key}"]`,
            }).toString()}
          >
            {children}
          </div>
        );

        switch (block._type) {
          case "hero":
            return (
              <DragHandle key={block._key}>
                <Hero {...block} />
              </DragHandle>
            );
          case "splitImage":
            return (
              <DragHandle key={block._key}>
                <SplitImage {...block} />
              </DragHandle>
            );
          case "content":
            return (
              <DragHandle key={block._key}>
                <Content {...block} />
              </DragHandle>
            );
          case "pickedPosts":
            return (
              <DragHandle key={block._key}>
                <PickedPosts {...block} />
              </DragHandle>
            );
          default:
            // This is a fallback for when we don't have a block type
            // @ts-expect-error since we don't know the type here, its never here. TODO: find a better way to handle this
            return <div key={block._key}>Block not found: {block._type}</div>;
        }
      })}
    </main>
  );
}
