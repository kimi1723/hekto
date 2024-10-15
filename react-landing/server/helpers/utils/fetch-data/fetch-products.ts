"use server";

import fetch from "./fetch-data";

import { type ProductsVariants } from "../../types/data-types";

const fetchProducts = async (variant: ProductsVariants = "all") => {
  try {
    const data = await fetch("products");
    const filteredData = data[variant];

    if (!filteredData)
      throw new Error(`Product's data variant: "${variant}" not found.`);

    return filteredData;
  } catch (error) {
    if (error instanceof Error) throw error;

    throw {
      message: "Failed to fetch products.",
      status: 500,
    };
  }
};

export default fetchProducts;
