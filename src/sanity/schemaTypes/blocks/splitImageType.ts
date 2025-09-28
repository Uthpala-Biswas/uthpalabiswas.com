import { defineField, defineType } from "sanity";
import { BlockContentIcon } from "@sanity/icons";

export const splitImageType = defineType({
  name: "splitImage",
  type: "object",
  fields: [
    defineField({
      name: "title",
      type: "string",
      description:
        "This title for easily identifying the block here on the studio. It will not used on the website.",
    }),
    defineField({
      name: "orientation",
      type: "string",
      options: {
        list: [
          { value: "imageLeft", title: "Image Left" },
          { value: "imageRight", title: "Image Right" },
        ],
      },
    }),
    defineField({
      title: "Content",
      name: "contentMatter",
      type: "blockContent",
    }),
    defineField({
      name: "image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
  ],
  icon: BlockContentIcon,
  preview: {
    select: {
      title: "title",
      media: "image",
    },
    prepare({ title, media }) {
      return {
        title: title ? title.trim() : "Split image",
        media: media ?? BlockContentIcon,
      };
    },
  },
});
