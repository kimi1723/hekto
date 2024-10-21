"use server";

import { cookies } from "next/headers";
import fetch from "./fetch-data/fetch-data";

import { type Product, type UsersVariants } from "../types/data-types";

import fetchProducts from "./fetch-data/fetch-products";
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

    const userIndex = users.findIndex((user) => +user.id === +userId);
    if (userIndex === -1)
      throw new Error(`Failed to update ${variant} for user with id ${userId}`);

    const products = await fetchProducts();
    const [product] = products.filter(({ id }) => id === productId);

    const user = users[userIndex];
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
  product: Product;
  updatedList: Product[];
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
  const existingProductIndex = updatedList.findIndex(
    (p) => p.id === product?.id
  );
  const productExists = existingProductIndex !== -1;
  if (variant === "favorites") {
    if (productExists) updatedList.splice(existingProductIndex, 1);

    if (!productExists) updatedList.push(product);

    return updatedList;
  }

  if (clearCart) return [];

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

  const existingProduct = updatedList[existingProductIndex];
  const validValue = newValue === undefined || newValue > 0;

  if (!validValue) updatedList.splice(existingProductIndex, 1);

  if (validValue) {
    const newQuantity = newValue ? newValue : existingProduct.quantity + 1 || 1;
    const newTotal = calcIndividualTotal({ ...product, newQuantity });

    existingProduct.quantity = newQuantity;
    existingProduct.total = newTotal;
  }

  return updatedList;
};

export default sendData;
