import { defineArrayMember, defineField, defineType } from "sanity";
import { PersonStandingIcon } from "lucide-react";

export const aboutPageType = defineType({
  name: "aboutPage",
  title: "About page",
  type: "document",
  icon: PersonStandingIcon,
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
