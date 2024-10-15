"use server";

import { readWriteFile } from "../utils";
import {
  FILES_MAP,
  type PagesData,
  type ProductsData,
  type UsersData,
} from "../../types/data-types";

type FetchDataReturnType = {
  products: ProductsData;
  users: UsersData;
  pages: PagesData;
};

const fetchData = async <K extends keyof typeof FILES_MAP>(
  key: K
): Promise<FetchDataReturnType[K]> => {
  const fileName = FILES_MAP[key].path;
  const [readFile] = await readWriteFile<FetchDataReturnType[K]>(fileName);

  try {
    const fileData = await readFile();

    if (!fileData) throw new Error(`Error reading file "${fileName}".`);

    return fileData;
  } catch (error) {
    if (error instanceof Error) throw error;

    throw {
      message: "Failed to read the file.",
      status: 500,
    };
  }
};

export default fetchData;
