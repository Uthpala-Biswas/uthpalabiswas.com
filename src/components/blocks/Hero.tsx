import { PortableText } from "next-sanity";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import { type Hero as HeroType } from "@/sanity/types";
import { resolveColor } from "@/lib/resolveColor";
import { cn } from "@/lib/utils";
import { handlee } from "@/lib/fonts";

export function Hero({
  title,
  titleColor,
  subtitle,
  subtitleColor,
  image,
  overlayColor,
  blur,
  cta,
}: HeroType) {
  return (
    <section className="relative flex sm:items-center justify-center px-2 pt-30 pb-42 overflow-hidden -mt-[80px] -mb-[150px]">
      {image && (
        <>
          (
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${urlFor(image).width(1600).height(800).url()})`,
            }}
          />
          ){/* Dark overlay for better text readability */}
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: resolveColor(overlayColor, "rgba(0,0,0,0)"),
              backdropFilter: `blur(${blur}px)`,
            }}
          />
        </>
      )}

      <div className="absolute w-full h-full bg-gradient-to-b from-[10%] from-transparent via-background/70 to-background bottom-0 pointer-events-none"></div>
      <div className={cn("relative max-w-8xl mx-auto p-5", handlee.className)}>
        {title ? (
          <div
            className={cn(
              "text-5xl sm:text-6xl text-balance mb-2 sm:mb-5 mt-8 leading-15 text-center",
            )}
            style={{ color: resolveColor(titleColor, "var(--foreground)") }}
          >
            <PortableText value={title} />
          </div>
        ) : null}
        {subtitle ? (
          <div
            className={cn(
              "text-2xl max-w-3xl mx-auto leading-relaxed text-pretty text-center",
            )}
            style={{
              color: resolveColor(subtitleColor, "var(--foreground)"),
            }}
          >
            <PortableText value={subtitle} />
          </div>
        ) : null}
        {cta ? BlogCTA(cta) : null}
      </div>
    </section>
  );
}

function BlogCTA(text: string) {
  return (
    <div className={cn("mt-12 text-center z-20", handlee.className)}>
      <Link
        href="/posts"
        className="rounded-full inline-block relative font-bold z-2 px-6 py-3 bg-gradient-to-tr border-1 border-sacred-700/40 hover:border-sacred-700/60 from-sacred-200/90 to-sacred-400/70 text-sacred-900/70 hover:text-sacred-900 shadow-lg hover:bg-sacred-300 hover:shadow-xl transition-all duration-300 ease-in-out text-lg sm:text-lg"
      >
        {text}
      </Link>
    </div>
  );
}
