import { type ReactNode } from "react";
import Link, { type LinkProps } from "next/link";

import {
  HOCUS_VARIANTS,
  type HocusVariantsProps,
} from "@/helpers/constants/colors";

interface InlineLinkProps extends LinkProps, HocusVariantsProps {
  children: ReactNode;
  className?: string;
}

const InlineLink = ({
  children,
  className = "",
  variant = "primary",
  ...props
}: InlineLinkProps) => {
  const classes = `relative flex items-center ${HOCUS_VARIANTS[variant]} focus:outline-none transition-colors ${className}`;

  return (
    <Link className={classes} {...props}>
      {children}
    </Link>
  );
};

export default InlineLink;
