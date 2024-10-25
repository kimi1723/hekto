"use server";

import { cookies } from "next/headers";
import fetch from "./fetch-data/fetch-data";

import { type Product, type UsersVariants } from "../types/data-types";

import { fetchProduct } from "./fetch-data/fetch-products";
import { calcIndividualTotal } from "@/helpers/utils/utils";

interface SendData {
  variant: Exclude<UsersVariants, "all">;
  productId?: number;
  newValue?: number;
  clearCart?: boolean;
}

const sendData = async ({
  variant,
  productId,
  newValue,
  clearCart,
}: SendData) => {
  const userId = cookies().get("userId")?.value;

  try {
    if (!userId) throw new Error(`Couldn't get your session.`);

    const users = await fetch("users");
    const user = users.find((user) => user.id === userId);

    if (!user)
      throw new Error(`Failed to update ${variant} for user with id ${userId}`);

    const product = productId ? await fetchProduct(productId) : undefined;

    const variantList = user[variant];
    const updatedList = handleVariantUpdate({
      variant,
      product,
      updatedList: [...variantList],
      newValue,
      clearCart,
    });

    user[variant] = updatedList;

    await fetch(
      `users`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
        body: JSON.stringify({ ...user, [variant]: updatedList }),
      },
      userId
    );

    return updatedList;
  } catch (error) {
    if (error instanceof Error) throw error;

    throw {
      message: `Failed to update ${variant} for user with id ${userId}`,
      status: 500,
    };
  }
};

interface handleVariantUpdate {
  variant: string;
  updatedList: Product[];
  product?: Product;
  newValue?: number;
  clearCart?: boolean;
}

const handleVariantUpdate = ({
  variant,
  product,
  updatedList,
  newValue,
  clearCart,
}: handleVariantUpdate) => {
  if (clearCart) return [];

  if (!product) throw new Error("Product not specified");

  const existingProductIndex = updatedList.findIndex(
    (p) => p.id === product?.id
  );
  const productExists = existingProductIndex !== -1;

  if (variant === "favorites") {
    if (productExists) updatedList.splice(existingProductIndex, 1);

    if (!productExists) updatedList.push(product);

    return updatedList;
  }

  if (!productExists) {
    const newQuantity = newValue || 1;
    const newTotal = calcIndividualTotal({ ...product, newQuantity });

    updatedList.push({
      ...product,
      quantity: newQuantity,
      total: newQuantity * newTotal,
    });

    return updatedList;
  }

  const validValue = newValue === undefined || newValue > 0;

  if (!validValue) updatedList.splice(existingProductIndex, 1);

  if (validValue) {
    const existingProduct = updatedList[existingProductIndex];
    const newQuantity = newValue ? newValue : existingProduct.quantity + 1 || 1;
    const newTotal = calcIndividualTotal({ ...product, newQuantity });

    existingProduct.quantity = newQuantity;
    existingProduct.total = newTotal;
  }

  return updatedList;
};

export default sendData;
