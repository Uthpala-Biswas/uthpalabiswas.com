import {
  defineLocations,
  PresentationPluginOptions,
} from "sanity/presentation";

export const resolve: PresentationPluginOptions["resolve"] = {
  locations: {
    // Add more locations for other post types
    post: defineLocations({
      select: {
        title: "title",
        slug: "slug.current",
        category: "category.slug.current",
        categoryTitle: "category.title",
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || "Untitled",
            href: `/posts/${doc?.category}/${doc?.slug}`,
          },
          {
            title: `All posts under ${doc?.categoryTitle}`,
            href: `/posts/${doc?.category}`,
          },
          { title: "Posts index", href: `/posts` },
        ],
      }),
    }),
    page: defineLocations({
      select: {
        title: "title",
        id: "_id",
      },
      resolve: (doc) => {
        const id = doc?.id;
        const href = id == "homepage" ? "/" : id == "about-me" ? "/about" : "";

        return {
          locations: [
            {
              title: doc?.title,
              href,
            },
          ],
        };
      },
    }),
  },
};
