import { Color } from "@/sanity/types";

export function resolveColor(
  color: Color | null | undefined,
  defaultColor: string,
) {
  if (color?.rgb) {
    const c = color.rgb;
    return `rgba(${c.r},${c.g},${c.b},${c.a})`;
  } else {
    return defaultColor;
  }
}
