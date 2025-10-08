import { inter } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { TextLink } from "./TextLink";
import { eb_garamond } from "@/lib/fonts";
import Image from "next/image";
import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/live";
import { SITE_SEETTINGS_QUERY } from "@/sanity/lib/queries";
import { SocialIcon } from "@/components/icons/SocialIcons";

export async function Footer() {
  const { data: siteSettings } = await sanityFetch({
    query: SITE_SEETTINGS_QUERY,
  });

  return (
    <>
      <div className="mt-20"></div>
      <div className="p-2 pb-3 mt-auto text-center relative bg-gradient-to-t from-sacred-500/40 to-background">
        {siteSettings?.lotus ? (
          <div className="pt-3 flex items-center gap-0">
            <div className="w-full border-t"></div>
            <div className="text-3xl">
              <Image
                src="/blue-lotus.png"
                alt="Blue lotus image"
                className="shrink-0 inline-block relative bottom-1"
                width="80"
                height="80"
              />
            </div>
            <div className="w-full border-t"></div>
          </div>
        ) : (
          <div className="border-b mb-5" />
        )}
        <p
          className={cn(
            eb_garamond.className,
            "text-lg text-muted-foreground mb-2",
          )}
        >
          {siteSettings?.copyrightText?.trim()
            ? siteSettings.copyrightText.trim()
            : `© Uthpala Biswas, ${new Date().getFullYear()}`}
        </p>
        {siteSettings?.socialLinks && (
          <p className="my-2 text-muted-foreground flex items-center justify-center flex-wrap gap-1">
            {siteSettings.socialLinksIntro}
            <span className="inline-flex gap-2 justify-center flex-wrap items-center">
              {siteSettings.socialLinks?.map((link, i) => {
                if (!link.platform) return null;
                if (!link.url) return null;
                return (
                  <Link
                    key={i}
                    href={link.url}
                    target="_blank"
                    className="hover:text-sacred-800 relative bottom-[2px]"
                    rel="noreferrer noopener"
                  >
                    <SocialIcon platform={link.platform} />
                  </Link>
                );
              })}
            </span>
          </p>
        )}
        {siteSettings?.credit && (
          <p
            className={cn(
              "text-sm text-muted-foreground/80 mt-3 font-extralight tracking-wide",
              inter.className,
            )}
          >
            Crafted by{" "}
            <TextLink
              href="https://github.com/ashutoshbw"
              rel="noreferrer noopener"
            >
              ashutoshbw
            </TextLink>
          </p>
        )}
      </div>
    </>
  );
}
