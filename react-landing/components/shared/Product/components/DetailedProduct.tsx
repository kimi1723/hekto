import Image from "next/image";
import { motion } from "framer-motion";

import Label from "../../Typography/Label";
import Subtitle from "../../Typography/Subtitle";
import Stars from "../../Stars/Index";
import InlineLink from "../../InlineLink/Index";
import ProductButtonMenu from "../../ProductButtonMenu/Index";
import Card from "../../Card/Index";

import { MAX_STARS } from "@/helpers/constants/constants";
import { type DisplayedProductProps } from "@/helpers/types/product";

interface DetailedProductProps extends DisplayedProductProps {
  wide?: boolean;
}

const DetailedProduct = ({
  className = "",
  wide = true,
  name,
  motionId,
  originalPrice,
  discountedPrice,
  href,
  img: { alt, src, width, height },
  rating,
  description,
  ...buttonMenuProps
}: DetailedProductProps) => {
  const price = originalPrice.toFixed(2);
  const classes = `relative flex ${
    wide ? "gap-8 p-4" : "flex-col gap-4 p-2 pb-4 max-h-[448px] max-w-[304px]"
  } ${className}`;

  return (
    <Card el="article" className={classes}>
      <motion.div
        layoutId={motionId}
        className="relative"
        style={{ height: `${height}px`, width: `${width}px` }}
      >
        <Image alt={alt} src={src} fill />
      </motion.div>

      <div className={`mr-2 ${wide ? "mt-6" : ""}`}>
        <div
          className={`flex mb-2 ${wide ? "justify-between" : "flex-col gap-2"}`}
        >
          <InlineLink href={href}>
            <Subtitle variant="tertiary">{name}</Subtitle>
          </InlineLink>

          <div className="flex gap-2">
            <Stars count={rating} />
            <Stars count={MAX_STARS - rating} active={false} />
          </div>
        </div>

        {!discountedPrice && (
          <Label variant="bold" el="p">
            ${price}
          </Label>
        )}

        {discountedPrice && (
          <p className="flex gap-2.5 items-center">
            <Label el="span">${discountedPrice.toFixed(2)}</Label>
            <Label variant="sm" el="span" className="text-grey-3 line-through">
              ${price}
            </Label>
          </p>
        )}

        <p className={`text-grey-3 ${wide ? "mt-3" : "mt-6"}`}>
          {description.short}
        </p>

        <ProductButtonMenu
          name={name}
          className={wide ? "mt-8" : "mt-4"}
          {...{ ...buttonMenuProps, isActive: true }}
        />
      </div>
    </Card>
  );
};

export default DetailedProduct;
