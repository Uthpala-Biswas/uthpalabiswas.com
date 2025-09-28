import { SetStateAction, Dispatch } from "react";
import Link from "next/link";
import { inter } from "@/lib/fonts";
import { menuItems } from "./menuItems";
import { cn } from "@/lib/utils";

export function MobileNav({
  isOpen,
  setIsOpen,
  pathname,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  pathname: string;
}) {
  return (
    <div className="sm:hidden flex items-center justify-end mr-1">
      <button
        className="flex flex-col justify-center items-center w-10 space-y-1 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg
          className="w-6 h-6"
          viewBox="0 0 24 24"
          fill="currentColor"
          strokeLinecap="round"
        >
          <rect
            x="0"
            y="4.5"
            width="24"
            height="2"
            className={`transition-all duration-300 ease-in-out ${
              isOpen ? "translate-y-[7px] rotate-45" : ""
            }`}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          />
          <rect
            x="0"
            y="11.5"
            width="24"
            height="2"
            className={`transition-all duration-300 ease-in-out ${
              isOpen ? "opacity-0" : ""
            }`}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          />
          <rect
            x="0"
            y="18.5"
            width="24"
            height="2"
            className={`transition-all duration-300 ease-in-out ${
              isOpen ? "-translate-y-[7px] -rotate-45" : ""
            }`}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          />
        </svg>
      </button>

      {isOpen && (
        <div
          className="mobile-nav-overlay"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <nav
        className={`absolute top-full left-0 w-full bg-gradient-to-b from-secondary to-background border-b shadow-xl transition-all duration-500 ease-in-out overflow-hidden z-200 ${isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 shadow-none"}`}
      >
        <ul
          className={cn(
            "flex flex-col items-center justify-center gap-0 w-full border-t py-3 text-muted-foreground",
            inter.className,
          )}
        >
          {menuItems.map((item, i) => (
            <li key={i} className="w-full">
              <Link
                className={cn(
                  "block transition-colors px-6 py-3 text-right",
                  item.href === pathname && "font-black",
                )}
                href={item.href}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
