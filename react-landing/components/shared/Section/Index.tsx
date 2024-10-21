import type ChildrenComponentProps from "@/helpers/types/children-component-props";

interface SectionProps extends ChildrenComponentProps {
  px?: boolean;
}

const Section = ({
  children,
  el = "section",
  className = "",
  px = true,
}: SectionProps) => {
  const El = el;
  const classes = `max-w-[1920px] mx-auto ${
    px ? "px-[19rem]" : ""
  } ${className}`;

  return <El className={classes}>{children}</El>;
};

export default Section;
