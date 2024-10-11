"use server";

import { cookies } from "next/headers";

import { readWriteFile } from "./helpers";
import { FILES_MAP, type UsersData } from "./data-types";

export const saveUser = async () => {
  const id = cookies().get("userId")?.value;

  if (!id) throw new Error("No session created");

  const fileName = FILES_MAP.users.path;
  const [readUsers, writeUsers] = readWriteFile<UsersData>(fileName);

  const users = await readUsers();
  const user = users.find((user) => user.id === +id);

  if (user) return;

  const updatedUsers = [...users, { id: +id, cart: [], favorites: [] }];

  writeUsers(updatedUsers);
};
