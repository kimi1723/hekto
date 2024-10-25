export const HOCUS_VARIANTS = {
  primary: "hocus:text-primary",
  primaryLight: "hocus:text-primary-light",
  white: "hocus:text-white",
  black: "hocus:text-black",
  infoWhite: "hocus:text-info-white",
};

export type HocusVariantsKeys = keyof typeof HOCUS_VARIANTS;

export interface HocusVariantsProps {
  variant?: keyof typeof HOCUS_VARIANTS;
}

export const BG_VARIANTS = {
  primary: {
    active: "bg-primary",
    inactive: "bg-primary-light",
  },
  secondary: {
    active: "bg-secondary",
    inactive: "bg-secondary-light",
  },
  info: {
    active: "bg-info",
    inactive: "bg-info-light",
  },
};

export type BgVariantsKeys = keyof typeof BG_VARIANTS;
