import { FC } from "react";

import {
  SUBTITLES_DATA,
  type SubtitlesProps,
} from "@/helpers/constants/subtitles";

import type ChildrenComponentProps from "@/helpers/types/children-component-props";

interface SubtitleProps extends ChildrenComponentProps, SubtitlesProps {}

const Subtitle: FC<SubtitleProps> = ({
  children,
  variant = "primary",
  className = "",
  el: El = "p",
  ...props
}) => {
  const { classes } = SUBTITLES_DATA[variant];

  return (
    <El className={`${classes} ${className}`} {...props}>
      {children}
    </El>
  );
};

export default Subtitle;
