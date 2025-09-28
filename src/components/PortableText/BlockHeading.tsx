import type { PortableTextComponentProps } from "next-sanity";
import type { PortableTextBlock } from "next-sanity";
import { scrollableKey } from "@/lib/scrollableId";
import { PostHeading } from "./PostHeading";
import { PlainHeading } from "./PlainHeading";

export function getBlockHeading(style: "plain" | "post") {
  const Heading = style == "post" ? PostHeading : PlainHeading;

  return function BlockHeading(
    props: PortableTextComponentProps<PortableTextBlock>,
  ) {
    const { value, children } = props;
    const id = value._key ? scrollableKey(value._key) : undefined;

    switch (props.value.style) {
      case "h1":
        return (
          <Heading
            as="h1"
            id={id}
            className="text-5xl font-extrabold lg:text-5xl mb-10 mt-13"
          >
            {children}
          </Heading>
        );
      case "h2":
        return (
          <Heading as="h2" id={id} className="text-4xl mt-12">
            {children}
          </Heading>
        );
      case "h3":
        return (
          <Heading as="h3" id={id} className="text-3xl mt-10">
            {children}
          </Heading>
        );
      case "h4":
        return (
          <Heading as="h4" id={id} className="text-2xl mt-8">
            {children}
          </Heading>
        );
      case "h5":
        return (
          <Heading as="h5" id={id} className="text-xl mt-8">
            {children}
          </Heading>
        );
      case "h6":
        return (
          <Heading as="h6" id={id} className="text-lg mt-8">
            {children}
          </Heading>
        );
    }
  };
}
