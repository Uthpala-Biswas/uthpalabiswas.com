import { DocumentIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const postsPageMetadataType = defineType({
  name: "postsPageMetadata",
  title: "Posts page metadata",
  type: "document",
  icon: DocumentIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "description",
      description: "This will be shown on the page if provided.",
      type: "plainBlockContent",
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],
});
