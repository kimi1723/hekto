const PRODUCT_QUERY_KEYS = {
  products: "products",
  featured: "featured",
  latest: "latest",
} as const;

const USER_QUERY_KEYS = {
  favorites: "favorites",
  cart: "cart",
} as const;

const PAGES_QUERY_KEYS = {
  home: {
    headerViews: "home-header-views",
  },
} as const;

const QUERY_KEYS = {
  ...PRODUCT_QUERY_KEYS,
  ...USER_QUERY_KEYS,
  ...PAGES_QUERY_KEYS,
  user: [USER_QUERY_KEYS.favorites, USER_QUERY_KEYS.cart],
} as const;

export const {
  products: PRODUCTS_KEY,
  featured: FEATURED_KEY,
  latest: LATEST_KEY,
  favorites: FAVORITES_KEY,
  cart: CART_KEY,
  user: USER_KEYS,
  home: { headerViews: HOME_HEADER_VIEWS_KEY },
} = QUERY_KEYS;
