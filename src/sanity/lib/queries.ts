import { defineQuery } from "next-sanity";

export const POSTS_QUERY =
  defineQuery(`*[_type == "post" && seo.noIndex != true && defined(slug.current)]|order(publishedAt desc){
  _id,
  language,
  title,
  slug,
  mainImage,
  publishedAt,
  "category": category->{
    title,
    titleInBangla,
    slug,
    "seo": {
      "title": coalesce(seo.title, title, ""),
      "description": coalesce(seo.description,  ""),
      "image": seo.image,
      "noIndex": seo.noIndex == true
    },
  },
  description,
}`);

export const POSTS_OF_CATEGORY_QUERY =
  defineQuery(`*[_type == "post" && seo.noIndex != true && defined(slug.current) && category->slug.current == $category]|order(publishedAt desc){
  _id,
  language,
  title,
  slug,
  body,
  mainImage,
  publishedAt,
  "category": category->{
    title,
    titleInBangla,
    slug,
    "seo": {
      "title": coalesce(seo.title, title, ""),
      "description": coalesce(seo.description,  ""),
      "image": seo.image,
      "noIndex": seo.noIndex == true
    },
  },
  description,
}`);

export const POST_QUERY =
  defineQuery(`*[_type == "post" && slug.current == $slug][0]{
  _id,
  language,
  title,
  body[]{
    ...,
    asset->{
      _id,
      metadata {
        dimensions {
          width,
          aspectRatio,
        }
      }
    }
  },
  mainImage,
  publishedAt,
  "category": category->{
     title,
     titleInBangla,
     slug,
  },
  "seo": {
    "title": coalesce(seo.title, title, ""),
    "description": coalesce(seo.description,  ""),
    "image": seo.image,
    "noIndex": seo.noIndex == true
  },
}`);

export const CATEGORY_QUERY =
  defineQuery(`*[_type == "category" && slug.current == $category][0]{
  _id,
  title,
}`);

export const CATEGORIES_QUERY = defineQuery(`*[_type == "category"]{
    _id,
    title,
    slug,
  }`);

export const HOMEPAGE_QUERY =
  defineQuery(`*[_type == "homepage" && _id == "homepage"][0]{
    ...,
    "seo": {
      "title": coalesce(seo.title, title, ""),
      "description": coalesce(seo.description,  ""),
      "image": seo.image,
      "noIndex": seo.noIndex == true
    },
    pageBuilder[]{
      ...,
      (_type == "content" || _type == "splitImage") => {
        ...,
        contentMatter[]{
          ...,
          _type == "image" => {
            ...,
            asset->{
              _id,
              metadata {
                dimensions {
                  width,
                  aspectRatio
                }
              }
            }
          }
        }
      },
      (_type == "pickedPosts") => {
        ...,
        "posts": posts[]->{
          _id,
          language,
          title,
          slug,
          mainImage,
          publishedAt,
          "category": category->{
            title,
            titleInBangla,
            slug,
            "seo": {
              "title": coalesce(seo.title, title, ""),
              "description": coalesce(seo.description,  ""),
              "image": seo.image,
              "noIndex": seo.noIndex == true
            },
          },
          description,
        }
      }
    }
  }`);

export const ABOUT_ME_PAGE_QUERY =
  defineQuery(`*[_type == "aboutPage" && _id == "about-page"][0]{
    ...,
    "seo": {
      "title": coalesce(seo.title, title, ""),
      "description": coalesce(seo.description,  ""),
      "image": seo.image,
      "noIndex": seo.noIndex == true
    },
    pageBuilder[]{
      ...,
      (_type == "content" || _type == "splitImage") => {
        ...,
        contentMatter[]{
          ...,
          _type == "image" => {
            ...,
            asset->{
              _id,
              metadata {
                dimensions {
                  width,
                  aspectRatio
                }
              }
            }
          }
        }
      }
    }
  }`);

export const NOW_PAGE_QUERY =
  defineQuery(`*[_type == "nowPage" && _id == "now-page"][0]{
    ...,
    "seo": {
      "title": coalesce(seo.title, title, ""),
      "description": coalesce(seo.description,  ""),
      "image": seo.image,
      "noIndex": seo.noIndex == true
    },
    pageBuilder[]{
      ...,
      (_type == "content" || _type == "splitImage") => {
        ...,
        contentMatter[]{
          ...,
          _type == "image" => {
            ...,
            asset->{
              _id,
              metadata {
                dimensions {
                  width,
                  aspectRatio
                }
              }
            }
          }
        }
      }
    }
  }`);

export const POSTS_PAGE_METADATA_QUERY = defineQuery(
  `*[_type == "postsPageMetadata"][0]{
    ...,
    "seo": {
      "title": coalesce(seo.title, title, ""),
      "description": coalesce(seo.description,  ""),
      "image": seo.image,
      "noIndex": seo.noIndex == true
    },
  }`,
);

export const HEADER_COLOR_QUERY =
  defineQuery(`*[_type == "homepage"][0].pageBuilder[_type == "hero"][0]{
  _type,
  initialHeaderTextColor
}`);

export const SITE_SEETTINGS_QUERY =
  defineQuery(`*[_type == "siteSettings" && _id == "site-settings"][0]{
  lotus,
  socialLinksIntro,
  socialLinks[]{
    platform,
    url
  },
  copyrightText,
  credit,
}`);

export const OG_IMAGE_QUERY = defineQuery(`
  *[_id == $id][0]{
    title,
    "image": mainImage.asset->{
      _id,
      metadata {
        palette
      }
    }
  }
`);

export const SITEMAP_QUERY = defineQuery(`
  *[_type == "post"]{
    "href": "/posts/" + category->slug.current + "/" + slug.current,
    _updatedAt,
  }
  +
  [
    *[_type == "homepage"][0]{ "href": "/", _updatedAt },
    *[_type == "aboutPage"][0]{ "href": "/about", _updatedAt },
    *[_type == "nowPage"][0]{ "href": "/now", _updatedAt },
    *[_type == "postsPageMetadata"][0]{ "href": "/posts", _updatedAt }
  ]
`);
