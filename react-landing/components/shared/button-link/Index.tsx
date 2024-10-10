import { type ReactNode } from "react";
import Link, { type LinkProps } from "next/link";

import Subtitle from "@/components/shared/typography/Subtitle";

import { type SubtitlesProps } from "@/helpers/constants/subtitles";
import {
  buttonColors,
  buttonSizes,
  type ButtonStyles,
} from "@/helpers/constants/button-styles";

interface ButtonLinkProps extends LinkProps, SubtitlesProps, ButtonStyles {
  children: ReactNode;
  className?: string;
  icon?: boolean;
}

const ButtonLink = ({
  children,
  variant = "quaternary",
  className = "",
  icon,
  size = "default",
  color = "primary",
  ...props
}: ButtonLinkProps) => {
  const classes = `${
    icon ? "py-1.5 px-3.5" : buttonSizes[size]
  } font-josefin text-white rounded-lg focus:outline-none active:scale-95 active:transform-x-0.5 transition-all ${
    buttonColors[color]
  } ${className}`;

  return (
    <Link className={classes} {...props}>
      {icon ? (
        children
      ) : (
        <Subtitle variant={variant} el="span">
          {children}
        </Subtitle>
      )}
    </Link>
  );
};

export default ButtonLink;
