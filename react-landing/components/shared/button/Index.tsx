import { FC, type ButtonHTMLAttributes } from "react";

import Subtitle from "@/components/shared/typography/Subtitle";

import { type SubtitlesProps } from "@/helpers/constants/subtitles";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    SubtitlesProps {
  icon?: boolean;
}

const Button: FC<ButtonProps> = ({
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
