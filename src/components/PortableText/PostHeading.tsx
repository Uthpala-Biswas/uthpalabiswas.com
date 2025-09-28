import { Link } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

type Types = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
type HeadingProps<T extends Types> = Omit<ComponentPropsWithoutRef<T>, "as"> & {
  as?: T;
};

export function PostHeading<T extends Types = "h1">({
  as,
  className,
  ...props
}: HeadingProps<T>): React.ReactElement {
  const As = as ?? "h1";

  if (!props.id) return <As className={className} {...props} />;

  return (
    <As
      className={cn(
        "scroll-mt-15 mb-5 tracking-tight [&_code]:text-[1em]",
        as !== "h1" && "relative flex border-b border-accent font-semibold",
        className,
      )}
      {...props}
    >
      {as == "h1" ? (
        props.children
      ) : (
        <a href={`#${props.id}`} className="group flex-grow pb-[0.1em]">
          <span className="absolute sm:inline hidden left-[-0.8em] text-muted-foreground opacity-0 group-hover:opacity-100 transition">
            <Link className="relative bottom-[0.09em] inline w-[0.7em] h-[0.7em]" />
          </span>
          {props.children}
          <span className="sm:sr-only text-muted-foreground">
            <Link
              aria-label="Link to section"
              className="relative bottom-[0.09em] left-[0.01em] inline w-[0.7em] h-[0.7em] ml-[0.15em]"
            />
          </span>
        </a>
      )}
    </As>
  );
}
