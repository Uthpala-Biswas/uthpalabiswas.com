import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { OG_IMAGE_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import { ImageResponse } from "next/og";

export const runtime = "edge";

async function loadGoogleFont(font: string, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${font}&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(url)).text();
  const resource = css.match(
    /src: url\((.+)\) format\('(opentype|truetype)'\)/,
  );

  if (resource) {
    const response = await fetch(resource[1]);
    if (response.status == 200) {
      return await response.arrayBuffer();
    }
  }

  throw new Error("failed to load font data");
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    notFound();
  }

  const data = await client.fetch(OG_IMAGE_QUERY, { id });

  if (!data) {
    notFound();
  }

  const vibrantBackground =
    data?.image?.metadata?.palette?.vibrant?.background ?? "#3B82F6";
  const darkVibrantBackground =
    data?.image?.metadata?.palette?.darkVibrant?.background ?? "#3B82F6";

  const text = data.title || "";

  return new ImageResponse(
    (
      <div
        tw="flex w-full h-full relative"
        style={{
          background: `linear-gradient(135deg, ${vibrantBackground} 0%, ${darkVibrantBackground} 100%)`,
        }}
      >
        {/* Content container */}
        <div tw="flex flex-row w-full h-full relative">
          {/* Text content */}
          <div tw="flex-1 flex items-center px-10 flex-col justify-center">
            <h1 tw="text-7xl tracking-tight leading-none text-white leading-tight font-black">
              {text}
            </h1>
            <p tw="w-full flex justify-end border-2 text-4xl font-bold text-white">
              by Uthpala Biswas
            </p>
          </div>

          {/* Image container */}
          {data.image && (
            <div tw="flex w-[500px] h-[630px] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={urlFor(data.image).width(500).height(630).url()}
                alt=""
                tw="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
        <pre tw="absolute bottom-5 right-10 text-white text-xl font-extralight">
          www.uthpalabiswas.com
        </pre>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Roboto",
          data: await loadGoogleFont("Roboto", text),
          weight: 400,
          style: "normal",
        },
      ],
    },
  );
}
