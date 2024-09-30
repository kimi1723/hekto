import { FC, type ButtonHTMLAttributes } from "react";

import {
  HOCUS_VARIANTS,
  type HocusVariantsProps,
} from "@/helpers/constants/colors";

interface InlineButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    HocusVariantsProps {}

const InlineButton: FC<InlineButtonProps> = ({
  children,
  className = "",
  variant = "primary",
  ...props
}) => {
  const classes = `relative flex items-center ${HOCUS_VARIANTS[variant]} focus:outline-none transition-colors ${className}`;

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

export default InlineButton;
