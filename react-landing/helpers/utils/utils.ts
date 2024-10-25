import { type AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { type ReadonlyURLSearchParams } from "next/navigation";

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

export const handleParamsChange = ({
  key,
  value,
  searchParams,
  router,
}: {
  key: string;
  value: string;
  searchParams: ReadonlyURLSearchParams;
  router: AppRouterInstance;
}) => {
  const currentParams = new URLSearchParams(searchParams);
  const currentParam = currentParams.get(key);

  if (currentParam && currentParam === value) currentParams.delete(key);
  else currentParams.set(key, value);

  router.push(`?${currentParams.toString()}`, { scroll: false });
};
