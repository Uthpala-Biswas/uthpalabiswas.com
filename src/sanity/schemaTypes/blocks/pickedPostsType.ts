import { defineField, defineType, defineArrayMember } from "sanity";
import { BlockContentIcon } from "@sanity/icons";

export const pickedPostsType = defineType({
  name: "pickedPosts",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      type: "string",
    }),
    defineField({
      name: "posts",
      type: "array",
      of: [
        defineArrayMember({
          name: "post",
          type: "reference",
          to: [{ type: "post" }],
        }),
      ],
    }),
  ],
  icon: BlockContentIcon,
  preview: {
    select: {
      title: "heading",
    },
    prepare({ title }) {
      return {
        title: title ? title.trim() : "Hand Picked Posts",
        media: BlockContentIcon,
      };
    },
  },
});
