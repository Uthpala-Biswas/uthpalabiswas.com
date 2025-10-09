"use client";

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { presentationTool } from "sanity/presentation";
import { colorInput } from "@sanity/color-input";

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schema } from "./src/sanity/schemaTypes";
import { structure } from "./src/sanity/structure";
import { resolve } from "@/sanity/presentation/resolve";

export default defineConfig({
  basePath: "/studio",
  title: "Studio",
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  plugins: [
    colorInput(),
    structureTool({ structure }),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
    presentationTool({
      resolve,
      previewUrl: {
        previewMode: {
          enable: "/api/draft-mode/enable",
          disable: "/api/draft-mode/disable",
        },
      },
    }),
  ],
  document: {
    newDocumentOptions: (prev) =>
      prev.filter(
        (item) =>
          !(
            item.templateId == "siteSettings" ||
            item.templateId == "homepage" ||
            item.templateId == "aboutPage" ||
            item.templateId == "nowPage" ||
            item.templateId == "postsPageMetadata"
          ),
      ),
    actions: (prev, { schemaType }) => {
      if (
        schemaType === "homepage" ||
        schemaType == "aboutPage" ||
        schemaType == "nowPage" ||
        schemaType == "siteSettings" ||
        schemaType == "postsPageMetadata"
      ) {
        return prev.filter(
          (action) =>
            !(action.action == "delete" || action.action == "duplicate"),
        );
      }
      return prev;
    },
  },
});
