"use server";

import { type ProductsVariants } from "../../types/data-types";
import fetchData from "./fetch-data";

const fetchProducts = async (variant: ProductsVariants = "all") => {
  try {
    const data = await fetchData("products");
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

export const fetchProduct = async (id: number) => {
  try {
    const products = await fetchProducts();
    const product = products.find((p) => p.id === id);

    if (!product) throw new Error(`Product with ID: ${id} not found.`);

    return product;
  } catch (error) {
    if (error instanceof Error) throw error;

    throw {
      message: `Failed to fetch product with ID: ${id}.`,
      status: 500,
    };
  }
};

export default fetchProducts;
