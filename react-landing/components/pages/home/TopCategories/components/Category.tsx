import { useState } from "react";
import Image from "next/image";
import { type Url } from "next/dist/shared/lib/router/router";

import MotionButtonLink from "@/components/shared/MotionButtonLink/Index";
import Subtitle from "@/components/shared/Typography/Subtitle";

import { kebabToCamelCase } from "@/helpers/utils/utils";

interface CategoryProps {
  img: { src: string; alt: string };
  href: Url;
  title: string;
}

const transformDurationClass = "transition-transform duration-500";

const Category = ({ href, title, img: { src, alt } }: CategoryProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const isActive = isHovered || isFocused;

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => setIsHovered(false);

  const handleFocus = () => setIsFocused(true);

  const handleBlur = () => setIsFocused(false);

  const handleImageLoad = () => setIsImageLoaded(true);

  return (
    <div
      className={`flex flex-col gap-8 items-center group hocus:-translate-y-6 ${transformDurationClass}`}
      tabIndex={0}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      <div className="relative h-[272px] w-[272px]">
        <div
          className={`absolute h-full w-full rounded-full -z-10 group-hover:scale-0-90 group-focus:scale-0-90 ${
            isImageLoaded ? "bg-grey-3" : ""
          } ${transformDurationClass}`}
        ></div>

        <Image
          src={src}
          alt={alt}
          height={272}
          width={272}
          className={`rounded-full group-hover:scale-[0.99] group-focus:scale-[0.99] group-hover:-translate-y-[2%] group-hover:translate-x-[2%] group-focus:-translate-y-[2%] group-focus:translate-x-[2%] ${transformDurationClass}`}
          onLoadingComplete={handleImageLoad}
        />

        <MotionButtonLink
          isActive={isActive}
          href={href}
          className="pl-4 min-w-max bottom-4 min-h-8"
        >
          View Category
        </MotionButtonLink>
      </div>

      <Subtitle variant="quaternary" el="h3">
        {kebabToCamelCase(title)}
      </Subtitle>
    </div>
  );
};

export default Category;
