export const FILES_MAP = {
  products: {
    path: "products.json",
    variants: ["all", "featured", "latest"],
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
  set?: "new-arrival" | "best-seller" | "featured" | "special-offer";
}

export interface ProductsData {
  all: Product[];
  featured: Product[];
  latest: Product[];
}

export interface User {
  id: number;
  cart: Product[];
  favorites: Product[];
}

export type UsersData = User[];

export type CartData = User["cart"];

export type FavoritesData = User["favorites"];

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
