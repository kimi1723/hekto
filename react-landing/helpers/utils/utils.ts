export const transformPx = (px: number) => px / 16 + "rem";

export const kebabToCamelCase = (str: string) =>
  str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
