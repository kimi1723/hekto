import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

import Card from "@/components/shared/card/Index";
import ProductButtonMenu from "@/components/shared/product-button-menu/Index";
import MotionButtonLink from "@/components/shared/motion-button-link/Index";
import Label from "@/components/shared/typography/Label";

import { type ShadowedProductProps } from "@/helpers/types/product";

const ShadowedProduct = ({
  id,
  name,
  originalPrice,
  href,
  img: { alt, ...img },
  code,
  discountedPrice,
  className,
  ...buttonMenuProps
}: ShadowedProductProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const isActive = isHovered || isFocused;
  const price = originalPrice.toFixed(2);

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => setIsHovered(false);

  const handleFocus = () => setIsFocused(true);

  const handleBlur = () => setIsFocused(false);

  return (
    <Card
      el="article"
      className={`relative text-center hover:-translate-y-6 focus-within:-translate-y-6 duration-500 ${className}`}
      tabIndex={0}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      <motion.div layoutId={id.toString()}>
        <Image alt={alt} {...img} />
      </motion.div>

      <ProductButtonMenu
        isActive={isActive}
        name={name}
        className="absolute top-2 left-2"
        {...buttonMenuProps}
      />

      <div className="relative flex flex-col gap-2 py-6">
        <MotionButtonLink
          isActive={isActive}
          href={href}
          className="-top-[5px] min-h-[38px]"
        >
          View details
        </MotionButtonLink>

        <Label variant="bold" el="h3" className="text-primary">
          {name}
        </Label>

        {code && (
          <Label variant="sm" el="p" className="mt-4 text-grey-3">
            Code - {code}
          </Label>
        )}

        {!discountedPrice && (
          <Label variant="bold" el="p">
            ${price}
          </Label>
        )}

        {discountedPrice && (
          <p className="flex gap-[15px] justify-center items-center">
            <Label el="span">${discountedPrice.toFixed(2)}</Label>
            <Label variant="sm" el="span" className="line-through text-grey-3">
              ${price}
            </Label>
          </p>
        )}
      </div>
    </Card>
  );
};

export default ShadowedProduct;
