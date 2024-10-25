"use server";

import fetchData from "./fetch-data";

import { type Product, type ProductsVariants } from "../../types/data-types";

const fetchProducts = async (
  variant: ProductsVariants = "all",
  page?: number,
  limit?: number,
  sortBy?: string,
  price?: string
) => {
  try {
    const data = await fetchData("products");
    const filteredData = data[variant];

    if (!filteredData)
      throw new Error(`Product's data variant: "${variant}" not found.`);

    const isPaginated = page && limit;

    if (!isPaginated) return { data: filteredData, totalPages: 0 };

    const [paginatedData, totalPages] = paginateProducts({
      products: filteredData,
      page,
      limit,
      sortBy,
      price,
    });

    return { data: paginatedData, totalPages };
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
    const { data } = await fetchProducts();
    const product = data.find((p) => p.id === id);

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

interface PagineProducts {
  products: Product[];
  page: number;
  limit: number;
  sortBy?: string;
  price?: string;
}

const paginateProducts = ({
  products,
  page,
  limit,
  sortBy,
  price,
}: PagineProducts): [Product[], number] => {
  const filteredProducts = filterProducts(products, price);
  const sortedProducts = sortProducts(filteredProducts, sortBy);
  const totalPages = Math.ceil(filteredProducts.length / limit);
  const paginatedProducts = sortedProducts.slice(
    (page - 1) * limit,
    page * limit
  );

  return [paginatedProducts, totalPages];
};

const filterProducts = (products: Product[], price?: string | null) => {
  if (!price) return products;

  const [minPrice, maxPrice] = price?.includes("-")
    ? price.split("-")
    : [price.slice(0, -1), undefined];

  return products.filter((p) => {
    const productPrice = p.discountedPrice || p.originalPrice;

    return (
      productPrice >= Number(minPrice) &&
      (maxPrice ? productPrice <= Number(maxPrice) : true)
    );
  });
};

const sortProducts = (products: Product[], sortBy?: string) =>
  products.toSorted((a, b) => {
    const aPrice = a.discountedPrice || a.originalPrice;
    const bPrice = b.discountedPrice || b.originalPrice;

    return sortBy === "high-to-low" ? bPrice - aPrice : aPrice - bPrice;
  });

export default fetchProducts;
