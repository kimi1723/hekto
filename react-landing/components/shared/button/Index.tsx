import { type ButtonHTMLAttributes } from "react";

import Subtitle from "@/components/shared/typography/Subtitle";

import { type SubtitlesProps } from "@/helpers/constants/subtitles";
import {
  buttonSizes,
  buttonColors,
  type ButtonStyles,
  type ButtonColorsProps,
} from "@/helpers/constants/button-styles";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    SubtitlesProps,
    ButtonStyles {
  icon?: boolean;
  color?: ButtonColorsProps;
}

const Button = ({
  children,
  variant = "quaternary",
  className = "",
  icon,
  size = "default",
  color = "primary",
  ...props
}: ButtonProps) => {
  const classes = `${
    icon ? "py-1.5 px-3.5" : buttonSizes[size]
  } font-josefin text-white rounded-lg focus:outline-none active:scale-95 active:transform-x-0.5 transition-all ${
    buttonColors[color]
  } ${className}`;

  return (
    <button className={classes} {...props}>
      {icon ? (
        children
      ) : (
        <Subtitle variant={variant} el="span">
          {children}
        </Subtitle>
      )}
    </button>
  );
};

export default Button;
