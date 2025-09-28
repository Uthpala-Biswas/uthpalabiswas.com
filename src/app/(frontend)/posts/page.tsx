import { sanityFetch } from "@/sanity/lib/live";
import { POSTS_QUERY } from "@/sanity/lib/queries";
import { POSTS_PAGE_METADATA_QUERY } from "@/sanity/lib/queries";
import { PostsPage } from "@/components/PostsPage";
import type { Metadata } from "next";
import { urlFor } from "@/sanity/lib/image";

const getPageMetadata = async () =>
  sanityFetch({
    query: POSTS_PAGE_METADATA_QUERY,
  });

export async function generateMetadata(): Promise<Metadata> {
  const { data: pageMetadata } = await getPageMetadata();

  if (!pageMetadata) return {};

  const metadata: Metadata = {
    title: pageMetadata.seo.title,
    description: pageMetadata.seo.description,
  };

  if (pageMetadata.seo.image) {
    metadata.openGraph = {
      images: {
        url: urlFor(pageMetadata.seo.image).width(1200).height(630).url(),
        width: 1200,
        height: 630,
      },
    };
  }

  if (pageMetadata.seo.noIndex) {
    metadata.robots = "noindex";
  }

  return metadata;
}

export default async function Page() {
  const { data: posts } = await sanityFetch({ query: POSTS_QUERY });
  const { data: pageMetadata } = await getPageMetadata();

  return <PostsPage description={pageMetadata?.description} posts={posts} />;
}
