"use server";

import {
  DATA_API_VARIANTS,
  type PagesData,
  type ProductsData,
  type UsersData,
} from "../../types/data-types";

type FetchDataReturnType = {
  products: {
    data: ProductsData;
    totalCount: number;
  };
  users: UsersData;
  pages: PagesData;
};
interface FetchConfig extends RequestInit {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  headers?: Record<string, string>;
  body?: string;
}

const basicConfig = {
  headers: {
    "ngrok-skip-browser-warning": "true",
  },
};

const fetchData = async <K extends keyof typeof DATA_API_VARIANTS>(
  key: K,
  config: FetchConfig = basicConfig,
  additionalPath: string = ""
): Promise<FetchDataReturnType[K]> => {
  try {
    const { API_URL } = process.env;
    const res = await fetch(`${API_URL}/${key}/${additionalPath}`, config);

    if (!res.ok)
      throw new Error(`Error occured when receiving the response for ${key}".`);

    const parsedRes = await res.json();

    if (key !== "products") return parsedRes;

    const totalCountStr = res.headers.get("X-Total-Count");
    const totalCount = totalCountStr ? parseInt(totalCountStr, 10) : 0;

    return {
      data: parsedRes,
      totalCount,
    } as FetchDataReturnType[K];

    return parsedRes;
  } catch (error) {
    if (error instanceof Error) throw error;

    throw {
      message: "Failed to read the file.",
      status: 500,
    };
  }
};

export default fetchData;
