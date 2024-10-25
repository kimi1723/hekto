import { FilterElement } from "@/components/pages/products/components/FiltersBar/Filter";
import { BgVariantsKeys } from "@/helpers/constants/colors";

export const DATA_API_VARIANTS = {
  products: {
    variants: ["all", "featured", "latest", "trending"],
  },
  users: {
    variants: ["all", "cart", "favorites"],
  },
  pages: {
    variants: ["home", "products"],
  },
} as const;

export type Key = keyof typeof DATA_API_VARIANTS;

export type Variants<T extends Key> =
  (typeof DATA_API_VARIANTS)[T]["variants"][number];

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
  imgViews: {
    src: string;
    alt: string;
  }[];
  rating: number;
  description: {
    title: string;
    short: string;
    long: string;
  };
  details: string[];
  quantity: number;
  total: number;
  detailedProductViews?: string[];
  discountedPrice?: number;
  code?: string;
  set?: "new-arrival" | "best-seller" | "featured" | "special-offer";
}

export type ProductsData = {
  [K in ProductsVariants]: Product[];
};

export type ProductSortBy = "high-to-low" | "low-to-high";
export interface User {
  id: string;
  cart: Product[];
  favorites: Product[];
}

export type UsersData = User[];

export type CartData = User["cart"];

export type FavoritesData = User["favorites"];

export const categories = [
  "headphones",
  "laptop",
  "other",
  "perfume",
  "present-box",
  "bracelet",
  "ring",
] as const;

export type Category = (typeof categories)[number];
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
    uniqueProduct: {
      id: number;
      title: string;
      descriptionList: string[];
    };
    discountItems: {
      controlTitle: string;
      primaryTitle: string;
      secondaryTitle: string;
      description: string;
      features: string[];
      img: {
        src: string;
        alt: string;
      };
      path: Category;
    }[];
    topCategories: {
      title: Category;
      img: {
        src: string;
        alt: string;
      };
      path: Category;
    }[];
    latestBlog: {
      id: number;
      author: string;
      timestamp: number;
      title: string;
      description: string;
      img: {
        src: string;
        alt: string;
      };
    }[];
  };
  products: {
    filters: {
      name: string;
      queryParamKey: string;
      variant: BgVariantsKeys;
      elements: FilterElement[];
    }[];
  };
}

export type HomeViews = keyof PagesData["home"];

export type HomeDiscountItems = PagesData["home"]["discountItems"];

export type HomeCategory = PagesData["home"]["topCategories"];

export type HomeBlogPosts = PagesData["home"]["latestBlog"];

export type ProductsPageVariants = keyof PagesData["products"];
