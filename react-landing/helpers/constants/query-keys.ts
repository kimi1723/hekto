enum PRODUCT_QUERY_KEYS {
  All = "products",
  Featured = "featured",
  Latest = "latest",
}

enum USER_QUERY_KEYS {
  Favorites = "favorites",
  Cart = "cart",
}

enum PAGES_QUERY_KEYS {
  HomeHeaderViews = "home-header-views",
}

const QUERY_KEYS = {
  Products: { ...PRODUCT_QUERY_KEYS },
  Home: {
    HeaderViews: PAGES_QUERY_KEYS.HomeHeaderViews,
  },
  User: {
    ...USER_QUERY_KEYS,
    All: [USER_QUERY_KEYS.Favorites, USER_QUERY_KEYS.Cart],
  },
} as const;

export const { Products, Home, User } = QUERY_KEYS;
