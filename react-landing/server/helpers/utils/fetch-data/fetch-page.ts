"use server";

import fetch from "./fetch-data";

import { type HomeViews, type PagesVariants } from "../../types/data-types";

const fetchPage = async (variant: PagesVariants) => {
  try {
    const data = await fetch("pages");
    const filteredData = data[variant];

    if (!filteredData)
      throw new Error(`Product's data variant: "${variant}" not found.`);

    return filteredData;
  } catch (error) {
    if (error instanceof Error) throw error;

    throw {
      message: `Failed to fetch ${variant} page data.`,
      status: 500,
    };
  }
};

export const fetchHomePage = async (view: HomeViews) => {
  const homeData = await fetchPage("home");

  return homeData[view];
};

export default fetchPage;
