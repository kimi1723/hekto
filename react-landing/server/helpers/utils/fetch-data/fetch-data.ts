"use server";

import { API_URL } from "./../../constants/constants";

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
interface FetchConfig extends RequestInit {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  headers?: Record<string, string>;
  body?: string;
}

const fetchData = async <K extends keyof typeof FILES_MAP>(
  key: K,
  config: FetchConfig = {
    headers: {
      "ngrok-skip-browser-warning": "true",
    },
  },
  additionalPath: string = ""
): Promise<FetchDataReturnType[K]> => {
  try {
    const res = await fetch(`${API_URL}/${key}/${additionalPath}`, config);

    if (!res.ok)
      throw new Error(`Error occured when receiving the response for ${key}".`);

    return res.json();
  } catch (error) {
    if (error instanceof Error) throw error;

    throw {
      message: "Failed to read the file.",
      status: 500,
    };
  }
};

export default fetchData;
