"use client";
import Link from "next/link";
import { createDataAttribute } from "next-sanity";
import { SITE_SEETTINGS_QUERYResult } from "@/sanity/types";
import { client } from "@/sanity/lib/client";
import { useOptimistic } from "next-sanity/hooks";
import { stegaClean } from "@sanity/client/stega";
import { ICONS } from "@/components/icons/SocialIcons";

const { projectId, dataset, stega } = client.config();
export const createDataAttributeConfig = {
  projectId,
  dataset,
  baseUrl: typeof stega.studioUrl === "string" ? stega.studioUrl : "",
};

export function SocialIcons({
  socialLinks,
  documentId,
  documentType,
}: {
  socialLinks: NonNullable<SITE_SEETTINGS_QUERYResult>["socialLinks"];
  documentId: string;
  documentType: string;
}) {
  // Reconcile references: always prefer the resolved data from state
  const links = useOptimistic<
    NonNullable<SITE_SEETTINGS_QUERYResult>["socialLinks"] | undefined,
    NonNullable<SITE_SEETTINGS_QUERYResult>
  >(socialLinks, (state, action) => {
    if (action.id === documentId && action?.document?.socialLinks) {
      return action.document.socialLinks.map(
        (link) => state?.find((p) => p._key === link._key) ?? link,
      );
    }
    return state;
  });

  if (!links) {
    return null;
  }

  return (
    <span
      className="inline-flex gap-2 justify-center flex-wrap items-center"
      data-sanity={createDataAttribute({
        ...createDataAttributeConfig,
        id: documentId,
        type: documentType,
        path: "socialLinks",
      }).toString()}
    >
      {links.map((link) => {
        const platform = stegaClean(link.platform);
        return (
          <Link
            key={link._key}
            data-sanity={createDataAttribute({
              ...createDataAttributeConfig,
              id: documentId,
              type: documentType,
              path: `socialLinks[_key=="${link._key}"]`,
            }).toString()}
            href={link.url!}
          >
            {ICONS[platform!]()}
          </Link>
        );
      })}
    </span>
  );
}
