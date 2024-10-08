import type SectionProps from "@/helpers/types/children-component-props";

const Section = ({
  children,
  el = "section",
  className = "",
}: SectionProps) => {
  const El = el;

  return (
    <El className={`px-[19rem] max-w-[1920px] mx-auto ${className}`}>
      {children}
    </El>
  );
};

export default Section;
