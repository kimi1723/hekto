"use server";

import path from "path";
import { promises as fs } from "fs";

const FILES_MAP = {
  products: "products.json",
  cart: "cart.json",
} as const;

type FilesMapKey = keyof typeof FILES_MAP;

export const fetchData = async (key: FilesMapKey) => {
  const fileName = FILES_MAP[key];
  const filePath = path.join(process.cwd(), "server", "data", fileName);

  return await fs.readFile(filePath, "utf-8");
};

export const getProducts = async () => await fetchData("products");
