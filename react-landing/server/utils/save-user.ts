"use server";

import { cookies } from "next/headers";
import path from "path";
import { promises as fs } from "fs";

import { UsersData } from "./data-types";

export const saveUser = async () => {
  const id = cookies().get("userId")?.value;

  if (!id) throw new Error("No session created");

  const filePath = path.join(process.cwd(), "server", "data", "users.json");
  const users: UsersData = JSON.parse(await fs.readFile(filePath, "utf-8"));
  const user = users.find((user) => user.id === +id);

  if (user) return;

  const updatedUsers = [...users, { id: +id, cart: [], favorites: [] }];

  fs.writeFile(filePath, JSON.stringify(updatedUsers), "utf-8");
};
