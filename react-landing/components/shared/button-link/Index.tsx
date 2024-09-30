import { FC } from "react";
import Link, { type LinkProps } from "next/link";

import Subtitle from "@/components/shared/typography/Subtitle";

import type ChildrenComponentProps from "@/helpers/types/children-component-props";
import { type SubtitlesProps } from "@/helpers/constants/subtitles";

interface ButtonLinkProps
  extends LinkProps,
    ChildrenComponentProps,
    SubtitlesProps {
  icon?: boolean;
}

const ButtonLink: FC<ButtonLinkProps> = ({
  children,
  variant = "quaternary",
  className = "",
  icon,
  ...props
}) => {
  const classes = `${
    icon ? "py-1.5 px-3.5" : "py-4 p-10"
  } font-josefin text-white bg-primary rounded-lg hocus:bg-primary-dark active:scale-95 active:transform-x-0.5 transition-all ${className}`;

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
