import { SmartPageBuilder } from "@/components/SmartPageBuilder";
import { sanityFetch } from "@/sanity/lib/live";
import { HOMEPAGE_QUERY } from "@/sanity/lib/queries";
import type { Metadata } from "next";
import { urlFor } from "@/sanity/lib/image";

const getPage = async () =>
  sanityFetch({
    query: HOMEPAGE_QUERY,
  });

export async function generateMetadata(): Promise<Metadata> {
  const { data: page } = await getPage();

  if (!page) {
    return {};
  }

  const metadata: Metadata = {
    title: page.seo.title,
    description: page.seo.description,
  };

  if (page.seo.image) {
    metadata.openGraph = {
      images: {
        url: urlFor(page.seo.image).width(1200).height(630).url(),
        width: 1200,
        height: 630,
      },
    };
  }

  if (page.seo.noIndex) {
    metadata.robots = "noindex";
  }

  return metadata;
}

export default async function Home() {
  const { data: page } = await getPage();

  return page?.pageBuilder ? (
    <div className="sm:min-h-[100vh]">
      {/* This 80px is for making up for the fixed header */}
      <div className="h-[50px] sm:h-[80px]"></div>
      <SmartPageBuilder
        documentId={page._id}
        documentType={page._type}
        content={page.pageBuilder}
      />
    </div>
  ) : null;
}
