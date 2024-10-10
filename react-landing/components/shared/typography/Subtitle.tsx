import {
  SUBTITLES_DATA,
  type SubtitlesProps,
} from "@/helpers/constants/subtitles";

import type ChildrenComponentProps from "@/helpers/types/children-component-props";

interface SubtitleProps extends ChildrenComponentProps, SubtitlesProps {}

const Subtitle = ({
  children,
  variant = "primary",
  className = "",
  el: El = "p",
  ...props
}: SubtitleProps) => {
  const { classes } = SUBTITLES_DATA[variant];

  return (
    <El className={`${classes} ${className}`} {...props}>
      {children}
    </El>
  );
};

export default Subtitle;
