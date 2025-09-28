import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .id("blog")
    .title("Uthpala's Blog")
    .items([
      S.divider().title("All about my posts"),
      S.documentTypeListItem("post").title("Posts"),
      S.documentTypeListItem("category").title("Categories"),
      S.listItem()
        .id("posts-page-metadata")
        .schemaType("postsPageMetadata")
        .title("Posts page metadata")
        .child(
          S.editor()
            .id("posts-page-metadata")
            .schemaType("postsPageMetadata")
            .documentId("posts-page-metadata"),
        ),
      S.divider().title("Other pages"),
      S.listItem()
        .id("homepage")
        .schemaType("homepage")
        .title("Homepage")
        .child(
          S.editor()
            .id("homepage")
            .schemaType("homepage")
            .documentId("homepage"),
        ),
      S.listItem()
        .id("about-page")
        .schemaType("aboutPage")
        .title("About page")
        .child(
          S.editor()
            .id("about-page")
            .schemaType("aboutPage")
            .documentId("about-page"),
        ),
      S.listItem()
        .id("now-page")
        .schemaType("nowPage")
        .title("Now page")
        .child(
          S.editor()
            .id("now-page")
            .schemaType("nowPage")
            .documentId("now-page"),
        ),
      S.divider().title("Settings"),
      S.listItem()
        .id("site-settings")
        .schemaType("siteSettings")
        .title("Site Settings")
        .child(
          S.editor()
            .id("site-settings")
            .schemaType("siteSettings")
            .documentId("site-settings"),
        ),
    ]);
