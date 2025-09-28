import { sanityFetch } from "@/sanity/lib/live";
import { POST_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import { Post } from "@/components/Post";
import type { Metadata } from "next";
import { urlFor } from "@/sanity/lib/image";

type RouteProps = {
  params: Promise<{ slug: string }>;
};

const getPost = async (params: RouteProps["params"]) =>
  sanityFetch({
    query: POST_QUERY,
    params: await params,
  });

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000");

export async function generateMetadata({
  params,
}: RouteProps): Promise<Metadata> {
  const { data: post } = await getPost(params);

  if (!post) return {};

  const metadata: Metadata = {
    metadataBase: new URL(baseUrl),
    title: post.seo.title,
    description: post.seo.description,
  };

  metadata.openGraph = {
    images: [
      {
        url: post.seo.image
          ? urlFor(post.seo.image).width(1200).height(630).url()
          : `/api/og?id=${post._id}`,
        width: 1200,
        height: 630,
      },
    ],
  };

  if (post.seo.noIndex) {
    metadata.robots = "noindex";
  }

  return metadata;
}

export default async function Page({ params }: RouteProps) {
  const { data: post } = await getPost(params);

  if (!post) {
    notFound();
  }

  return (
    <main className="bg-background grow">
      <Post {...post} />
    </main>
  );
}
