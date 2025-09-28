import {
  Cardo,
  Inter,
  Tiro_Bangla,
  Noto_Sans_Bengali,
  EB_Garamond,
  Dancing_Script,
  Handlee,
} from "next/font/google";

export const cardo = Cardo({
  weight: "400",
  style: ["italic", "normal"],
  subsets: ["latin"],
});

export const dancing_script = Dancing_Script({
  subsets: ["latin"],
});

export const handlee = Handlee({
  weight: "400",
  subsets: ["latin"],
});

export const inter = Inter({
  subsets: ["latin"],
});

export const eb_garamond = EB_Garamond({
  subsets: ["latin"],
  style: ["italic", "normal"],
});

export const tiro_bangla = Tiro_Bangla({
  weight: "400",
  subsets: ["bengali"],
});

export const noto_sans_bengali = Noto_Sans_Bengali({
  subsets: ["bengali"],
});
