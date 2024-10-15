import { type ButtonHTMLAttributes } from "react";

import {
  HOCUS_VARIANTS,
  type HocusVariantsProps,
} from "@/helpers/constants/colors";

interface InlineButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    HocusVariantsProps {}

const InlineButton = ({
  children,
  className = "",
  variant = "primary",
  ...props
}: InlineButtonProps) => {
  const classes = `relative flex items-center ${HOCUS_VARIANTS[variant]} focus:outline-none transition-colors ${className}`;

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

export default InlineButton;
