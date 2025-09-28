import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity";
import { DisableDraftMode } from "@/components/DisableDraftMode";
import { SanityLive } from "@/sanity/lib/live";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HEADER_COLOR_QUERY } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/live";
import { resolveColor } from "@/lib/resolveColor";

export default async function FrontendLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: colorData } = await sanityFetch({
    query: HEADER_COLOR_QUERY,
  });

  return (
    <>
      <div className="flex flex-col min-h-[calc(100vh)]">
        <Header
          color={resolveColor(
            colorData?.initialHeaderTextColor,
            "var(--muted-foreground",
          )}
        />
        {children}
        <Footer />
      </div>
      <SanityLive />
      {(await draftMode()).isEnabled && (
        <>
          <DisableDraftMode />
          <VisualEditing />
        </>
      )}
    </>
  );
}
