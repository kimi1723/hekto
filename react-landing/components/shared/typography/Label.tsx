import { FC } from "react";

import { LABELS_DATA, type LabelsProps } from "@/helpers/constants/labels";

import type ChildrenComponentProps from "@/helpers/types/children-component-props";

interface LabelProps extends ChildrenComponentProps, LabelsProps {}

const Label: FC<LabelProps> = ({
  children,
  variant = "default",
  className = "",
  el: El = "label",
}) => {
  const { classes } = LABELS_DATA[variant];

  return <El className={`${classes} ${className}`}>{children}</El>;
};

export default Label;
