"use client";
import { useState } from "react";
import Link from "next/link";
import { MobileNav } from "./MobileNav";
import { menuItems } from "./menuItems";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { inter, dancing_script } from "@/lib/fonts";
import { TextLink } from "./TextLink";

export function Header({ color }: { color: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header
      className={cn("animated-header-height fixed top-0 w-full z-10")}
      style={
        {
          "--homepage-header-text-scrollstart-color":
            pathname === "/" ? color : "var(--muted-foreground)",
        } as React.CSSProperties
      }
    >
      <div
        className={cn(
          "sm:px-5 h-full flex items-center",
          pathname == "/" ? "animated-header-bg" : "bg-secondary",
        )}
      >
        <div className="flex items-center justify-between sm:justify-normal max-w-[1200px] mx-auto w-full">
          <Link
            className={cn(
              "px-3 py-2 text-2xl font-bold z-10 text-muted-foreground animated-header-text",
              dancing_script.className,
            )}
            href="/"
            onClick={() => setIsOpen(false)}
          >
            Uthpala Biswas
          </Link>
          <div
            className={cn(
              "ml-4 hidden sm:flex items-center justify-center",
              inter.className,
            )}
          >
            {menuItems.map((item, i) => (
              <TextLink
                key={i}
                className={cn(
                  "py-1 mx-1 text-center text-muted-foreground animated-header-text decoration-transparent underline-offset-4 decoration-2 duration-400",
                  pathname === item.href && `font-black`,
                )}
                href={item.href}
                style={{
                  width: i == 0 ? 55 : i == 1 ? 57 : 45,
                }}
              >
                {item.name}
              </TextLink>
            ))}
          </div>
          <MobileNav
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            pathname={pathname}
          />
        </div>
      </div>
    </header>
  );
}
