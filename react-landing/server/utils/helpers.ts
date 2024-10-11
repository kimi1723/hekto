import path from "path";
import { promises as fs } from "fs";
import { type FileNames } from "./data-types";

export const readWriteFile = <T>(fileName: FileNames) => {
  const filePath = path.join(process.cwd(), "public", "data", fileName);

  const readFile = async (): Promise<T> =>
    JSON.parse(await fs.readFile(filePath, "utf-8"));

  const writeFile = async (data: T): Promise<void> =>
    fs.writeFile(filePath, JSON.stringify(data), "utf-8");

  return [readFile, writeFile] as const;
};
