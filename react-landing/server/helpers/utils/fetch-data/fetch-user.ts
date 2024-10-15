"use server";

import { cookies } from "next/headers";

import fetch from "./fetch-data";
import {
  type User,
  type CartData,
  type FavoritesData,
  type UsersVariants,
} from "../../types/data-types";

type fetchUserReturnType = {
  all: User;
  cart: CartData;
  favorites: FavoritesData;
};

const isNotAll = <T extends UsersVariants>(
  variant: T
): variant is Exclude<T, "all"> => variant !== "all";

async function fetchUserData(): Promise<User>;
async function fetchUserData<T extends UsersVariants>(
  variant: T
): Promise<fetchUserReturnType[T]>;

async function fetchUserData<T extends UsersVariants>(variant: T = "all" as T) {
  const id = cookies().get("userId")?.value;

  if (!id) throw `Couldn't get your session.`;

  try {
    const data = await fetch("users");
    const user = data.find((user) => user.id === +id);

    if (!user) throw new Error(`User with ID: "${id}" not found.`);

    const filteredData = isNotAll(variant) ? user[variant] : user;

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
}

export const fetchCart = async () => await fetchUserData("cart");

export const fetchFavorites = async () => await fetchUserData("favorites");

export default fetchUserData;
