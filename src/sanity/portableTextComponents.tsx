import { PortableTextComponents } from "next-sanity";
import { getBlockHeading } from "@/components/PortableText/BlockHeading";
import { TextLink } from "@/components/TextLink";
import { TextImage } from "@/components/PortableText/TextImage";

export function getComponents(style: "plain" | "post") {
  const BlockHeading = getBlockHeading(style);

  const components: PortableTextComponents = {
    types: { image: TextImage },
    block: {
      h1: BlockHeading,
      h2: BlockHeading,
      h3: BlockHeading,
      h4: BlockHeading,
      h5: BlockHeading,
      h6: BlockHeading,
      normal: (props) => (
        <p className="my-5 last:mb-0 text-justify">{props.children}</p>
      ),
      blockquote: (props) => (
        <blockquote className="my-5 border-secondary border-l-4 pl-2 italic text-muted-foreground/85 text-xl relative secondary-font-family">
          {props.children}
        </blockquote>
      ),
    },
    list: {
      bullet: ({ children }) => (
        <ul className="mt-4 ml-6 list-disc [&>li]:mt-2 [&_ul]:my-0">
          {children}
        </ul>
      ),
      number: ({ children }) => (
        <ol className="mt-4 ml-6 [&>li]:mt-2 [&_ol]:my-0">{children}</ol>
      ),
    },
    marks: {
      link: ({ children, value }) => {
        // Customize markup/attrs as you like
        const rel = !value.href.startsWith("/")
          ? "noreferrer noopener"
          : undefined;
        return (
          <TextLink href={value.href} rel={rel}>
            {children}
          </TextLink>
        );
      },
    },
  };

  return components;
}
