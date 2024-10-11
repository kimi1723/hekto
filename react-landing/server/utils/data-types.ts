export const FILES_MAP = {
  products: {
    path: "products.json",
    variants: ["all", "featured"],
  },
  users: {
    path: "users.json",
    variants: ["all", "cart", "favorites"],
  },
  pages: {
    path: "pages.json",
    variants: ["home"],
  },
} as const;

export type Key = keyof typeof FILES_MAP;

export type FileNames = (typeof FILES_MAP)[Key]["path"];

export type FileDataForKey<T extends keyof typeof FILES_MAP> =
  T extends "products"
    ? ProductsData
    : T extends "users"
    ? UsersData
    : T extends "pages"
    ? PagesData
    : never;

export type Variants<T extends Key> = (typeof FILES_MAP)[T]["variants"][number];

export type ProductsVariants = Variants<"products">;
export type UsersVariants = Variants<"users">;
export type PagesVariants = Variants<"pages">;

export interface Product {
  id: number;
  name: string;
  originalPrice: number;
  img: {
    src: string;
    alt: string;
  };
  quantity: number;
  discountedPrice?: number;
  code?: string;
}

export interface ProductsData {
  all: Product[];
  featured: Product[];
}

export interface User {
  id: number;
  cart: Product[];
  favorites: Product[];
}

export type UsersData = User[];

export interface PagesData {
  home: {
    headerViews: {
      label: string;
      heading: string;
      description: string;
      img: {
        src: string;
        alt: string;
      };
      discount?: string;
    }[];
  };
}

export type HomeViews = keyof PagesData["home"];
