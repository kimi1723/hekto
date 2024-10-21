export const transformPx = (px: number) => px / 16 + "rem";

export const kebabToCamelCase = (str: string) =>
  str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

export const calcIndividualTotal = ({
  newQuantity,
  originalPrice,
  discountedPrice,
}: {
  newQuantity: number;
  originalPrice: number;
  discountedPrice?: number;
}) => (discountedPrice || originalPrice) * newQuantity;
