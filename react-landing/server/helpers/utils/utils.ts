"use server";

import { cookies } from "next/headers";
import path from "path";
import { promises as fs } from "fs";

import { type FileNames } from "../types/data-types";
import { FILES_MAP, type UsersData } from "../types/data-types";

export const readWriteFile = async <T>(fileName: FileNames) => {
  const filePath = path.join("/tmp", "data", fileName);

  await fs.mkdir(path.dirname(filePath), { recursive: true });

  const fileExists = async (path: string) => {
    try {
      await fs.access(path);
      return true;
    } catch {
      return false;
    }
  };

  const readFile = async (): Promise<T> => {
    try {
      if (!await fileExists(filePath)) {
        await fs.writeFile(filePath, JSON.stringify([]), "utf-8");
      }

      const data = await fs.readFile(filePath, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      console.error("Error reading file:", error);
      throw error;
    }
  };

  const writeFile = async (data: T): Promise<void> => {
    try {
      await fs.writeFile(filePath, JSON.stringify(data), "utf-8");
    } catch (error) {
      console.error("Error writing file:", error);
      throw error;
    }
  };

  return [readFile, writeFile] as const;
};

export const saveUser = async () => {
  const id = cookies().get("userId")?.value;

  if (!id) throw new Error("No session created");

  const fileName = FILES_MAP.users.path;

  const [readUsers, writeUsers] = await readWriteFile<UsersData>(fileName);

  try {
    const users = await readUsers();
    const user = users.find((user) => user.id === +id);

    if (user) return;

    const updatedUsers = [...users, { id: +id, cart: [], favorites: [] }];

    await writeUsers(updatedUsers);
  } catch (error) {
    console.error("Error in saveUser:", error);
    throw error;
  }
};
