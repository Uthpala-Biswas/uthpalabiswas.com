import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

type Types = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
type HeadingProps<T extends Types> = Omit<ComponentPropsWithoutRef<T>, "as"> & {
  as?: T;
};

export function PlainHeading<T extends Types = "h1">({
  as,
  className,
  ...props
}: HeadingProps<T>): React.ReactElement {
  const As = as ?? "h1";

  if (!props.id) return <As className={className} {...props} />;

  return (
    <As
      className={cn(
        "scroll-mt-15 mb-5 tracking-tight [&_code]:text-[1em] font-semibold",
        className,
      )}
      {...props}
    >
      {props.children}
    </As>
  );
}
