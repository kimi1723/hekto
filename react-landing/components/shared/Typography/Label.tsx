import { LABELS_DATA, type LabelsProps } from "@/helpers/constants/labels";

import type ChildrenComponentProps from "@/helpers/types/children-component-props";

interface LabelProps extends ChildrenComponentProps, LabelsProps {}

const Label = ({
  children,
  variant = "default",
  className = "",
  el: El = "label",
}: LabelProps) => {
  const { classes } = LABELS_DATA[variant];

  return <El className={`${classes} ${className}`}>{children}</El>;
};

export default Label;
