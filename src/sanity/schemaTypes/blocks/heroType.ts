import { defineField, defineType } from "sanity";
import { TextIcon } from "@sanity/icons";

export const heroType = defineType({
  name: "hero",
  type: "object",
  fieldsets: [
    { name: "title", title: "Title", options: { columns: 1 } },
    { name: "subtitle", title: "Subtitle", options: { columns: 1 } },
    { name: "bg", title: "Background", options: { columns: 1 } },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Text",
      type: "plainBlockContent",
      fieldset: "title",
    }),
    defineField({
      name: "titleColor",
      title: "Color",
      type: "color",
      fieldset: "title",
    }),
    defineField({
      name: "subtitle",
      title: "Text",
      type: "plainBlockContent",
      fieldset: "subtitle",
    }),
    defineField({
      name: "subtitleColor",
      title: "Color",
      type: "color",
      fieldset: "subtitle",
    }),
    defineField({
      name: "image",
      type: "image",
      options: {
        hotspot: true,
      },
      fieldset: "bg",
    }),
    defineField({
      title: "Background Image overlay color",
      name: "overlayColor",
      type: "color",
      fieldset: "bg",
    }),
    defineField({
      name: "blur",
      title: "Background blur",
      type: "number",
      validation: (Rule) => Rule.min(0).max(100).integer(),
      initialValue: 0,
      fieldset: "bg",
    }),
    defineField({
      title: "Initial header text color",
      description:
        "This is the header text color that appears on homepage only when you haven't scrolled the page yet.",
      name: "initialHeaderTextColor",
      type: "color",
    }),
    defineField({
      title: "Call to Action",
      name: "cta",
      type: "string",
      initialValue: "Check out my writings",
    }),
  ],
  icon: TextIcon,
  preview: {
    select: {
      media: "image",
    },
    prepare({ media }) {
      return {
        title: "Hero section",
        media: media ?? TextIcon,
      };
    },
  },
});
