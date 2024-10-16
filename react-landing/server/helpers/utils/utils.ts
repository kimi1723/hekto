"use server";

import { cookies } from "next/headers";
import path from "path";
import { promises as fs } from "fs";

import { type FileNames } from "../types/data-types";
import { FILES_MAP, type UsersData } from "../types/data-types";

export const readWriteFile = async <T>(fileName: FileNames) => {
    const filePath = path.join('/tmp', "data", fileName);

    await fs.mkdir(path.dirname(filePath), { recursive: true });

    const readFile = async (): Promise<T> => {
        try {
            const data = await fs.readFile(filePath, "utf-8");

            return JSON.parse(data);
        } catch (error) {
            throw error;
        }
    };

    const writeFile = async (data: T): Promise<void> => {
        await fs.writeFile(filePath, JSON.stringify(data), "utf-8");
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
        throw error;
    }
};
