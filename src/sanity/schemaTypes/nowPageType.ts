import { defineArrayMember, defineField, defineType } from "sanity";
import { ClockIcon } from "@sanity/icons";

export const nowPageType = defineType({
  name: "nowPage",
  title: "Now page",
  type: "document",
  icon: ClockIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "pageBuilder",
      type: "array",
      title: "Page builder",
      of: [
        defineArrayMember({ type: "splitImage" }),
        defineArrayMember({ type: "content" }),
      ],
      options: {
        insertMenu: {
          views: [
            {
              name: "grid",
              previewImageUrl: (schemaType) =>
                `/block-previews/${schemaType}.png`,
            },
          ],
        },
      },
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],
});
