"use server";

import { cookies } from "next/headers";
import path from "path";
import { promises as fs } from "fs";
import {
  FILES_MAP,
  type Product,
  type UsersData,
  type UsersVariants,
} from "./data-types";

import { fetchProducts } from "./fetch-data";

const handleVariantUpdate = (
  variant: string,
  product: Product,
  updatedList: Product[]
) => {
  const existingProductIndex = updatedList.findIndex(
    (p) => p.id === product.id
  );

  if (existingProductIndex === -1) {
    updatedList.push({ ...product, quantity: 1 });

    return updatedList;
  }

  if (variant === "favorites") {
    updatedList.splice(existingProductIndex, 1);

    return updatedList;
  }

  const existingProduct = updatedList[existingProductIndex];

  existingProduct.quantity = existingProduct.quantity + 1 || 0;

  return updatedList;
};

export const sendData = async (
  variant: Exclude<UsersVariants, "all">,
  productId: number
) => {
  const userId = cookies().get("userId")?.value;

  try {
    if (!userId) throw new Error(`Couldn't get your session.`);

    const fileName = FILES_MAP.users.path;
    const filePath = path.join(process.cwd(), "server", "data", fileName);

    const fileData = await fs.readFile(filePath, "utf-8");
    const users = JSON.parse(fileData) as UsersData;
    const userIndex = users.findIndex((user) => user.id === +userId);

    if (userIndex === -1)
      throw new Error(`Failed to update ${variant} for user with id ${userId}`);

    const products = await fetchProducts();
    const [product] = products.filter(({ id }) => id === productId);

    const user = users[userIndex];
    const variantList = user[variant];
    const updatedList = handleVariantUpdate(variant, product, [...variantList]);

    user[variant] = updatedList;

    await fs.writeFile(filePath, JSON.stringify(users), "utf-8");

    return updatedList;
  } catch (error) {
    if (error instanceof Error) throw error;

    throw {
      message: `Failed to update ${variant} for user with id ${userId}`,
      status: 500,
    };
  }
};
