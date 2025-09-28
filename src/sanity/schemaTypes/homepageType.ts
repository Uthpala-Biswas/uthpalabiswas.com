import { defineArrayMember, defineField, defineType } from "sanity";
import { HouseIcon } from "lucide-react";

export const homepageType = defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  icon: HouseIcon,
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
        defineArrayMember({ type: "hero" }),
        defineArrayMember({ type: "splitImage" }),
        defineArrayMember({ type: "content" }),
        defineArrayMember({ type: "pickedPosts" }),
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
