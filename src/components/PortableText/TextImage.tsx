import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { inter } from "@/lib/fonts";
import { cn } from "@/lib/utils";

interface CustomImageValue {
  alt?: string;
  description?: string;
  width?: number;
  asset: {
    metadata: {
      dimensions: {
        width: number;
        aspectRatio: number;
      };
    };
  };
}

interface PortableTextImageProps {
  value: CustomImageValue;
}

export function TextImage(props: PortableTextImageProps) {
  if (props.value) {
    const originalWidth = props.value.asset.metadata.dimensions.width;
    const width =
      props.value.width ?? (originalWidth > 1200 ? 1200 : originalWidth);
    const height = width / props.value.asset.metadata.dimensions.aspectRatio;

    return (
      <figure
        className="p-1 bg-card/80 mx-auto group shadow-sm"
        style={{ maxWidth: width }}
      >
        <Image
          className="border transition-all duration-300"
          src={urlFor(props.value)
            .width(width)
            .height(height)
            .quality(80)
            .auto("format")
            .url()}
          alt={props?.value?.alt || ""}
          width={width}
          height={height}
        />
        {props.value.description && (
          <figcaption
            className={cn(
              "mt-2 text-sm text-muted-foreground px-1 pb-1",
              inter.className,
            )}
          >
            {props.value.description}{" "}
          </figcaption>
        )}
      </figure>
    );
  } else {
    return null;
  }
}
