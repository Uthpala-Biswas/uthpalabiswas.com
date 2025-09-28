import { defineField, defineType } from "sanity";
import { BlockContentIcon } from "@sanity/icons";

export const contentType = defineType({
  name: "content",
  type: "object",
  fields: [
    defineField({
      name: "title",
      type: "string",
      description:
        "This title for easily identifying the block here on the studio. It will not used on the website.",
    }),
    defineField({
      title: "Content",
      name: "contentMatter",
      type: "blockContent",
    }),
  ],
  icon: BlockContentIcon,
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: title ? title.trim() : "Content",
      };
    },
  },
});
