import { FC } from "react";
import Link, { type LinkProps } from "next/link";

import {
  HOCUS_VARIANTS,
  type HocusVariantsProps,
} from "@/helpers/constants/colors";
import type ChildrenComponentProps from "@/helpers/types/children-component-props";

interface InlineLinkProps
  extends LinkProps,
    HocusVariantsProps,
    ChildrenComponentProps {}

const InlineLink: FC<InlineLinkProps> = ({
  children,
  className = "",
  variant = "primary",
  ...props
}) => {
  const classes = `relative flex items-center ${HOCUS_VARIANTS[variant]} focus:outline-none transition-colors ${className}`;

  return (
    <Link className={classes} {...props}>
      {children}
    </Link>
  );
};

export default InlineLink;
