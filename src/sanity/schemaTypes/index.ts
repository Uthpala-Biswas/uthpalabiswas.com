import { type SchemaTypeDefinition } from "sanity";

import { blockContentType } from "./blockContentType";
import { plainBlockContentType } from "./plainBlockContent";
import { categoryType } from "./categoryType";
import { postType } from "./postType";
import { homepageType } from "./homepageType";
import { aboutPageType } from "./aboutPageType";
import { nowPageType } from "./nowPageType";
import { heroType } from "./blocks/heroType";
import { contentType } from "./blocks/contentType";
import { splitImageType } from "./blocks/splitImageType";
import { pickedPostsType } from "./blocks/pickedPostsType";
import { siteSettingsType } from "./siteSettingsType";
import { postsPageMetadataType } from "./postsPageMetadataType";
import { seoType } from "./seoType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    plainBlockContentType,
    categoryType,
    postType,
    heroType,
    contentType,
    splitImageType,
    pickedPostsType,
    homepageType,
    aboutPageType,
    nowPageType,
    siteSettingsType,
    postsPageMetadataType,
    seoType,
  ],
};
