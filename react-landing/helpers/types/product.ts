import { type LinkProps } from "next/link";
import { type Url } from "next/dist/shared/lib/router/router";

interface ProductProps extends Omit<LinkProps, "href"> {
  id: number;
  motionId: string;
  name: string;
  originalPrice: number;
  img: { src: string; alt: string; height: number; width: number };
  quantity: number;
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
  detailedProductViews?: string[];
  discountedPrice?: number;
  code?: string;
  className?: string;
  href?: Url;
  type?: "shadowed" | "simple" | "detailed-wide" | "detailed-card";
  total: number;
  buttonMenu?: boolean;
  viewDetailsButton?: boolean;
}

export interface ButtonMenuProps {
  isActive: boolean;
  isFavorite: boolean;
  isInCart: boolean;
  isInitialInCart: boolean;
  handleToggleFavorite: () => void;
  handleAddToCart: () => void;
  handleZoom: () => void;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
  handleFocus: () => void;
  handleBlur: () => void;
}

export interface DisplayedProductProps
  extends Omit<ProductProps, "type" | "id">,
    ButtonMenuProps {
  href: Url;
}

export default ProductProps;
