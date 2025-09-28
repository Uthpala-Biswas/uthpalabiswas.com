import "./globals.css";
import { cardo, tiro_bangla } from "@/lib/fonts";
import { cn } from "@/lib/utils";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={cn(
        cardo.className,
        tiro_bangla.className,
        "selection:bg-sacred-300 selection:text-accent-foreground scroll-smooth",
      )}
    >
      <body>{children}</body>
    </html>
  );
}
