"use server";

import fetchData from "./fetch-data";

import {
  PagesData,
  type HomeViews,
  type PagesVariants,
  type ProductsPageVariants,
} from "../../types/data-types";

const fetchPage = async <T extends PagesVariants>(
  variant: T
): Promise<PagesData[T]> => {
  try {
    const data = await fetchData("pages");
    const filteredData = data[variant];

    return filteredData;
  } catch (error) {
    if (error instanceof Error) throw error;

    throw {
      message: `Failed to fetch ${variant} page data.`,
      status: 500,
    };
  }
};

export const fetchHomePage = async <T extends HomeViews>(
  view: T
): Promise<PagesData["home"][T]> => {
  const homeData = await fetchPage("home");

  return homeData[view];
};

export const fetchProductsPage = async <T extends ProductsPageVariants>(
  variant: T
): Promise<PagesData["products"][T]> => {
  const productsPageData = await fetchPage("products");

  return productsPageData[variant];
};

export default fetchPage;
