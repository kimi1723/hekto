import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import ProductButtonMenu from "../../ProductButtonMenu/Index";
import Label from "../../Typography/Label";

import { type DisplayedProductProps } from "@/helpers/types/product";

const SimpleProduct = ({
  motionId,
  name,
  originalPrice,
  href,
  img: { alt, src, width, height },
  discountedPrice,
  className,
  isActive,
  handleMouseEnter,
  handleMouseLeave,
  handleFocus,
  handleBlur,
  ...buttonMenuProps
}: DisplayedProductProps) => {
  const price = originalPrice.toFixed(2);

  return (
    <article
      className={`relative ${className}`}
      tabIndex={0}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      <motion.div
        layoutId={motionId}
        className="relative mb-[12px]"
        style={{ height: `${height}px`, width: `${width}px` }}
      >
        <Image alt={alt} src={src} fill />
      </motion.div>

      <ProductButtonMenu
        isActive={isActive}
        name={name}
        className="absolute bottom-10 left-2 flex-col"
        {...buttonMenuProps}
        {...{ handleMouseEnter, handleMouseLeave, handleFocus, handleBlur }}
      />

      <div className="flex justify-between">
        <Link href={href}>
          <Label el="span">{name}</Label>
        </Link>

        {!discountedPrice && (
          <Label variant="bold" el="p">
            ${price}
          </Label>
        )}

        {discountedPrice && (
          <p className="flex gap-4 justify-center items-center">
            <Label el="span">${discountedPrice.toFixed(2)}</Label>
            <Label variant="sm" el="span" className="text-primary">
              ${price}
            </Label>
          </p>
        )}
      </div>
    </article>
  );
};

export default SimpleProduct;
