import { defineField, defineType, defineArrayMember } from "sanity";
import { ControlsIcon, LinkIcon } from "@sanity/icons";
import ICONS from "@/components/icons/SocialIcons";

const PLATFORMS = [
  { title: "Facebook", value: "facebook" },
  { title: "LinkedIn", value: "linkedin" },
  { title: "Twitter(X)", value: "twitter" },
  { title: "GitHub", value: "github" },
  { title: "SoundCloud", value: "soundcloud" },
  { title: "YouTube", value: "youtube" },
  { title: "Instagram", value: "instagram" },
];

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  icon: ControlsIcon,
  fieldsets: [{ name: "footer", title: "Footer", options: { columns: 1 } }],
  fields: [
    defineField({
      name: "lotus",
      title: "Toggle lotus",
      type: "boolean",
      initialValue: false,
      fieldset: "footer",
    }),
    defineField({
      name: "socialLinksIntro",
      title: "Social links intro text",
      description: "This is display before the social icons if provided",
      type: "string",
      fieldset: "footer",
    }),
    defineField({
      name: "socialLinks",
      title: "Social links",
      fieldset: "footer",
      type: "array",
      description: "Add your social links here to be displayed with icons",
      of: [
        defineArrayMember({
          type: "object",
          name: "socialLink",
          fields: [
            defineField({
              name: "platform",
              title: "Platform",
              type: "string",
              options: {
                list: PLATFORMS,
              },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "url",
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              platform: "platform",
              url: "url",
            },
            prepare({ platform, url }) {
              const platformTitle =
                PLATFORMS.find((option) => option.value === platform)?.title ||
                platform;
              return {
                title: platformTitle,
                subtitle: url,
                // @ts-expect-error this is a known limitation of sanity
                media: ICONS[platform] || LinkIcon,
              };
            },
          },
        }),
      ],
    }),
    defineField({
      name: "copyrightText",
      title: "Copyright(or left) text",
      description:
        "If not provided, the fallback is '© Uthpala Biswas, <CURRENT_YEAR>'",
      type: "string",
      fieldset: "footer",
    }),
    defineField({
      name: "credit",
      title: "Credit giving",
      description:
        "By enabling it you can give your support to Shakhamrigo at the bottom of the footer",
      type: "boolean",
      initialValue: false,
      fieldset: "footer",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Site Settings",
      };
    },
  },
});
