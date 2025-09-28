import { sanityFetch } from "@/sanity/lib/live";
import {
  POSTS_OF_CATEGORY_QUERY,
  POSTS_PAGE_METADATA_QUERY,
} from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import { PostsPage } from "@/components/PostsPage";
import type { Metadata } from "next";
import { urlFor } from "@/sanity/lib/image";

type RouteProps = {
  params: Promise<{ category: string }>;
};

const getPostsOfCategory = async (params: RouteProps["params"]) =>
  sanityFetch({
    query: POSTS_OF_CATEGORY_QUERY,
    params: await params,
  });

export async function generateMetadata({
  params,
}: RouteProps): Promise<Metadata> {
  const { data: posts } = await getPostsOfCategory(params);

  if (!posts) return {};

  const seo = posts[0].category?.seo;

  const metadata: Metadata = {
    title: seo?.title,
    description: seo?.description,
  };

  if (seo?.image) {
    metadata.openGraph = {
      images: {
        url: urlFor(seo.image).width(1200).height(630).url(),
        width: 1200,
        height: 630,
      },
    };
  }

  if (seo?.noIndex) {
    metadata.robots = "noindex";
  }

  return metadata;
}

export default async function Page({ params }: RouteProps) {
  const { data: posts } = await getPostsOfCategory(params);

  if (!posts) {
    notFound();
  }

  const { data: pageMetadata } = await sanityFetch({
    query: POSTS_PAGE_METADATA_QUERY,
  });

  return (
    <PostsPage
      description={pageMetadata?.description}
      posts={posts}
      isCategoryPage={true}
      categorySlug={(await params).category}
    />
  );
}
