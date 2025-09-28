import Link from "next/link";
import { cn } from "@/lib/utils";
import { type ComponentProps } from "react";
import { ExternalLinkIcon } from "@/components/icons/ExternalLinkIcon";

type LinkProps = ComponentProps<typeof Link>;
export function TextLink(props: LinkProps) {
  return (
    <Link
      className={cn(
        "group/link transition-all duration-300 text-sacred-800 underline decoration-sacred-500 hover:decoration-current pointer-coarse:decoration-current underline-offset-3",
        props.className,
      )}
      href={props.href}
      target={props.rel ? "_blank" : undefined}
      rel={props.rel}
      style={
        {
          ...props.style,
        } as React.CSSProperties
      }
    >
      {props.children}
      {props.rel && (
        <ExternalLinkIcon className="w-[1em] h-[1em] relative bottom-[0.16em] ml-[1px]" />
      )}
    </Link>
  );
}
