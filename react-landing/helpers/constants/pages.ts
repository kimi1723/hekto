export const MAIN_NAV_PAGES = {
  home: { name: "Home", path: "/" },
  products: { name: "Products", path: "/products" },
  blog: { name: "Blog", path: "/blog" },
  contact: { name: "Contact", path: "/contact" },
};

export const HOME_HEADER_VIEWS = {
  primary: {
    label: "Best Headphones For Your Life....",
    heading: "New trendy collection headphones",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo.",
  },
  secondary: {
    label: "Best Headphones For Your Life....",
    heading: "secondary collection headphones",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo.",
  },
  tertiary: {
    label: "Best Headphones For Your Life....",
    heading: "tertiary collection headphones",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo.",
  },
};

export type HomeHeaderView = keyof typeof HOME_HEADER_VIEWS;

export const homeHeaderViews = Object.keys(HOME_HEADER_VIEWS) as HomeHeaderView[];
