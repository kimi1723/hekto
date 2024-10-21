enum PRODUCT_QUERY_KEYS {
  All = "products",
  Featured = "featured",
  Latest = "latest",
  Trending = "trending",
}

enum USER_QUERY_KEYS {
  Favorites = "favorites",
  Cart = "cart",
}

enum PAGES_QUERY_KEYS {
  HomeHeaderViews = "home-header-views",
  HomeUniqueProduct = "home-unique-product",
  HomeDiscountItems = "home-discount-items",
  HomeTopCategories = "home-top-categories",
  HomeLatestBlog = "home-latest-blog",
}

const QUERY_KEYS = {
  Products: {
    ...PRODUCT_QUERY_KEYS,
    Individual(id: number) {
      return `product-${id}`;
    },
  },
  Home: {
    HeaderViews: PAGES_QUERY_KEYS.HomeHeaderViews,
    UniqueProduct: PAGES_QUERY_KEYS.HomeUniqueProduct,
    DiscountItems: PAGES_QUERY_KEYS.HomeDiscountItems,
    TopCategories: PAGES_QUERY_KEYS.HomeTopCategories,
    LatestBlog: PAGES_QUERY_KEYS.HomeLatestBlog,
  },
  User: {
    ...USER_QUERY_KEYS,
    All: [USER_QUERY_KEYS.Favorites, USER_QUERY_KEYS.Cart],
  },
} as const;

export const { Products, Home, User } = QUERY_KEYS;
