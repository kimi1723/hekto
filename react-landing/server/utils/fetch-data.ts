"use server";

import { cookies } from "next/headers";

import {
  FILES_MAP,
  FileDataForKey,
  HomeViews,
  PagesVariants,
  type ProductsVariants,
  type UsersVariants,
} from "./data-types";

import { readWriteFile } from "./helpers";

type FetchData = <T extends keyof typeof FILES_MAP>(
  key: T
) => Promise<FileDataForKey<T>>;

const fetchData: FetchData = async (key) => {
  const fileName = FILES_MAP[key].path;
  const [readData] = readWriteFile<FileDataForKey<typeof key>>(fileName);

  try {
    const fileData = await readData();

    if (!fileData) throw new Error(`Error reading file "${fileName}".`);

    return fileData;
  } catch (error) {
    if (error instanceof Error) throw error;

    throw {
      message: "Failed to read the file.",
      status: 500,
    };
  }
};

export const fetchUserData = async (variant: UsersVariants) => {
  const id = cookies().get("userId")?.value;

  if (!id) throw `Couldn't get your session.`;

  try {
    const data = await fetchData("users");
    const user = data.find((user) => user.id === +id);

    if (!user) throw new Error(`User with ID: "${id}" not found.`);

    const filteredData = variant === "all" ? user : user[variant];

    if (!filteredData)
      throw new Error(`User's product's data variant: "${variant}" not found.`);

    return filteredData;
  } catch (error) {
    if (error instanceof Error) throw error;

    throw {
      message: "Failed to fetch products.",
      status: 500,
    };
  }
};

export const fetchProducts = async (variant: ProductsVariants = "all") => {
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

export const fetchCart = async () => await fetchUserData("cart");

export const fetchFavorites = async () => await fetchUserData("favorites");

export const fetchPage = async (variant: PagesVariants) => {
  try {
    const data = await fetchData("pages");
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
