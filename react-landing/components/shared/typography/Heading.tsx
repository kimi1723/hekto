import { FC } from "react";

import {
  HEADINGS_DATA,
  type HeadingsProps,
} from "@/helpers/constants/headings";

import type ChildrenComponentProps from "@/helpers/types/children-component-props";

interface HeadingProps extends ChildrenComponentProps, HeadingsProps {}

const Heading: FC<HeadingProps> = ({
  children,
  variant,
  className = "",
  el: ProvidedEl,
}) => {
  const { el, classes } = HEADINGS_DATA[variant];
  const El = ProvidedEl || el;

  return (
    <El
      className={`${classes} capitalize font-bold tracking-[0.015em] ${className}`}
    >
      {children}
    </El>
  );
};

export default Heading;
