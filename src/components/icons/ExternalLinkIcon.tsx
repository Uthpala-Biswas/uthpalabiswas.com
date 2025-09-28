import { cn } from "@/lib/utils";
export function ExternalLinkIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 28 28"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("inline-block", className)}
    >
      <g transform="translate(0, 3)">
        <path
          d="M15 3h6v6"
          className="group-hover/link:-translate-y-[2px] group-hover/link:translate-x-[2px] transition-all duration-300"
        />
        <path
          d="M10 14 21 3"
          className="group-hover/link:-translate-y-[2px] group-hover/link:translate-x-[2px] transition-all duration-300"
        />
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      </g>
    </svg>
  );
}
