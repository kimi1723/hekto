import { type LinkProps } from "next/link";
import { type Url } from "next/dist/shared/lib/router/router";

interface ProductProps extends Omit<LinkProps, "href"> {
  id: number;
  name: string;
  originalPrice: number;
  img: { src: string; alt: string; height: number; width: number };
  discountedPrice?: number;
  quantity: number;
  code?: string;
  className?: string;
  href?: Url;
  type?: "shadowed";
}

export interface ButtonMenuProps {
  isFavorite: boolean;
  isInCart: boolean;
  isInitialInCart: boolean;
  handleToggleFavorite: () => void;
  handleAddToCart: () => void;
  handleToggleZoom: () => void;
}

export interface ShadowedProductProps
  extends Omit<ProductProps, "type">,
    ButtonMenuProps {
  href: Url;
}

export default ProductProps;
