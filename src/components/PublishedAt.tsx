import { POST_QUERYResult } from "@/sanity/types";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import "dayjs/locale/bn";

dayjs.extend(advancedFormat);

type PublishedAtProps = {
  publishedAt: NonNullable<POST_QUERYResult>["publishedAt"];
  language: NonNullable<POST_QUERYResult>["language"];
};

export function PublishedAt({ publishedAt, language }: PublishedAtProps) {
  const toBanglaDigits = (str: string) =>
    str.replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[Number(d)]);

  const dateString =
    language === "bn"
      ? toBanglaDigits(dayjs(publishedAt).locale("bn").format("MMMM Do, YYYY"))
      : dayjs(publishedAt).format("MMMM Do, YYYY");

  return publishedAt ? <span>{dateString}</span> : null;
}
